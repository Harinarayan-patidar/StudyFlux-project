const mongoose = require('mongoose');
const crypto = require('crypto');
const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../config/enrollmentMail');
const { default: toast } = require('react-hot-toast');
const CourseProgress = require("../models/CourseProgress"); // Make sure it's imported

// Helper: Normalize courses input (array or single string)
const normalizeCoursesInput = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') return [input];
  return [];
};

// Capture Razorpay Order
exports.capturePayment = async (req, res) => {
  console.log("[capturePayment] Request body:", req.body);

  let courses = normalizeCoursesInput(req.body.courses || req.body.courseId);
  const userId = req.user.id;
  console.log("[capturePayment] User ID:", userId);
  console.log("capturePayment called");
console.log("Token user:", req.user);
console.log("Request headers:", req.headers);

  if (courses.length === 0) {
    console.warn("[capturePayment] No courses provided");
    return res.status(400).json({ success: false, message: 'Please provide at least one valid course ID' });
  }

  let totalAmount = 0;

  try {
    for (const courseId of courses) {
      console.log(`[capturePayment] Processing course ID: ${courseId}`);
      const course = await Course.findById(courseId);
      if (!course) {
        console.error(`[capturePayment] Course not found: ${courseId}`);
        return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
          toast.error(`Already enrolled in course: ${course.courseName}`);
        console.warn(`[capturePayment] User already enrolled in course: ${course.courseName}`);
      
        return res.status(403).json({ success: false, message: `Already enrolled in course: ${course.courseName}` });
      }

      totalAmount += course.price;
      console.log(`[capturePayment] Added course price: ${course.price}, totalAmount now: ${totalAmount}`);
    }

    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: 'INR',
      receipt: Date.now().toString(),
    };

    console.log("[capturePayment] Creating Razorpay order with options:", options);
    const paymentResponse = await instance.orders.create(options);
    console.log("[capturePayment] Razorpay order created:", paymentResponse);

    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });

  } catch (error) {
    console.error('[capturePayment] Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while initiating payment' });
  }
};

// Verify Razorpay Payment Signature
exports.verifyPayment = async (req, res) => {
  console.log("[verifyPayment] Request body:", req.body);
  
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses: rawCourses,
    courseId: singleCourseId
  } = req.body;

  const userId = req.user.id;
  console.log("[verifyPayment] User ID:", userId);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
    console.warn("[verifyPayment] Missing payment or user details");
    return res.status(400).json({ success: false, message: 'Invalid payment details' });
  }

  const courses = normalizeCoursesInput(rawCourses || singleCourseId);

  if (courses.length === 0) {
    console.warn("[verifyPayment] No courses provided for enrollment");
    return res.status(400).json({ success: false, message: 'No courses provided for enrollment' });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body)
    .digest('hex');

  console.log("[verifyPayment] Expected signature:", expectedSignature);
  console.log("[verifyPayment] Received signature:", razorpay_signature);

  if (expectedSignature !== razorpay_signature) {
    console.error("[verifyPayment] Signature mismatch - verification failed");
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }

  try {
    console.log("[verifyPayment] Signature verified, enrolling student...");
    await enrollStudent(courses, userId);
    console.log("[verifyPayment] Enrollment successful");
    return res.status(200).json({ success: true, message: 'Payment verified and student enrolled' });
  } catch (error) {
    console.error('[verifyPayment] Error during enrollment:', error);
    return res.status(500).json({ success: false, message: 'Failed to enroll after verification' });
  }
};

// Enroll student in courses
const enrollStudent = async (courses, userId) => {
  console.log("[enrollStudent] Starting enrollment for user:", userId, "Courses:", courses);

  for (const courseId of courses) {
    console.log(`[enrollStudent] Processing course for enrollment: ${courseId}`);

    // 1. Update course model with student
    console.log(`[enrollStudent] Attempting to add user ${userId} to studentsEnrolled for course ${courseId}`);
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { studentsEnrolled: userId } },
      { new: true }
    );

    if (!course) {
      console.error(`[enrollStudent] Course not found during enrollment update: ${courseId}`);
      throw new Error(`Course not found: ${courseId}`);
    }
    console.log(`[enrollStudent] Course ${courseId} updated successfully. New studentsEnrolled count: ${course.studentsEnrolled.length}`);


    // 2. Create fresh course progress entry or find existing one
    console.log(`[enrollStudent] Checking for existing CourseProgress for userId: ${userId} and courseID: ${courseId}`);
    const existingProgress = await CourseProgress.findOne({ courseID: courseId, userId: userId });

    if (!existingProgress) {
      console.log("[enrollStudent] No existing CourseProgress found. Creating a new one...");
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [], // initial progress = 0
      });
      console.log("[enrollStudent] Course progress initialized successfully with ID:", courseProgress._id);

      // 3. Update User model with course and courseProgress
      console.log(`[enrollStudent] Updating User ${userId} with course ${courseId} and courseProgress ${courseProgress._id}`);
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { courses: courseId }, // Add course to user's courses
          $push: { courseProgress: courseProgress._id }, // Add courseProgress _id to user's courseProgress array
        },
        { new: true }
      );
      console.log(`[enrollStudent] User ${userId} updated successfully with new course and courseProgress reference.`);
    } else {
      console.log(`[enrollStudent] Existing CourseProgress found for userId: ${userId} and courseID: ${courseId}. Skipping progress creation.`);
      // If progress already exists, ensure the user is still correctly linked to the course in their 'courses' array
      console.log(`[enrollStudent] Ensuring user ${userId} is enrolled in course ${courseId} even if progress already exists.`);
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { courses: courseId },
          // No need to push courseProgress again if it already exists and is linked
        },
        { new: true }
      );
      console.log(`[enrollStudent] User ${userId} enrollment in course ${courseId} confirmed/updated.`);
    }

    // 4. Send mail
    const student = await User.findById(userId);
    if (student) {
      try {
        console.log(`[enrollStudent] Attempting to send enrollment email to ${student.email} for course ${course.courseName}`);
        await mailSender(
          student.email,
          'Congratulations! Your Enrollment is Confirmed',
          emailTemplate(student.firstName, course.courseName)
        );
        console.log(`[enrollStudent] Enrollment email sent successfully to: ${student.email}`);
      } catch (emailError) {
        console.error(`[enrollStudent] Email sending failed for ${student.email} for course ${course.courseName}:`, emailError.message);
      }
    } else {
      console.error(`[enrollStudent] Student user not found for ID: ${userId}, unable to send enrollment email.`);
    }
  }

  console.log("[enrollStudent] All course enrollments and progress creations/updates completed for user.");
};


// Send Payment Success Email (optional API if needed)
exports.sendPaymentSuccessEmail = async (req, res) => {
  console.log("[sendPaymentSuccessEmail] Request body:", req.body);
  const { paymentId, orderId, amount } = req.body;
  const userId = req.user.id;
  console.log("[sendPaymentSuccessEmail] User ID:", userId);

  if (!paymentId || !orderId || !amount || !userId) {
    console.warn("[sendPaymentSuccessEmail] Missing payment or user details");
    return res.status(400).json({ success: false, message: 'Invalid payment or user details' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("[sendPaymentSuccessEmail] User not found:", userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await mailSender(
      user.email,
      'Payment Successful',
      `Your payment of ₹${amount / 100} has been successfully processed.\nPayment ID: ${paymentId}\nOrder ID: ${orderId}\nThank you for your purchase!`
    );

    console.log(`[sendPaymentSuccessEmail] Payment success email sent to: ${user.email}`);
    return res.status(200).json({ success: true, message: 'Payment success email sent' });

  } catch (error) {
    console.error('[sendPaymentSuccessEmail] Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Could not send email' });
  }
};