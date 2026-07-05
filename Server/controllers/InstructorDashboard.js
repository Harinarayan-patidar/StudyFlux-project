const mongoose = require("mongoose");

const User = require("../models/User");
const Course = require("../models/Course");
const RatingAndReviews = require(
  "../models/RatingAndReview"
);

console.log(
  "🚀 InstructorDashboard Controller Loaded"
);

/* =========================================================
   GET INSTRUCTOR DASHBOARD
========================================================= */

exports.getInstructorDashboard = async (
  req,
  res
) => {
  console.log(
    "\n========================================"
  );

  console.log(
    "📊 GET INSTRUCTOR DASHBOARD STARTED"
  );

  console.log(
    "========================================"
  );

  try {
    /* =====================================================
       1. GET INSTRUCTOR ID FROM AUTH MIDDLEWARE
    ===================================================== */

    const instructorId = req.user?.id;

    console.log("👤 req.user:", req.user);

    console.log(
      "🆔 Instructor ID:",
      instructorId
    );

    if (!instructorId) {
      console.log(
        "❌ Instructor ID not found in req.user"
      );

      return res.status(401).json({
        success: false,

        message:
          "Unauthorized. Instructor ID not found.",
      });
    }

    /* =====================================================
       2. VALIDATE MONGODB ID
    ===================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(
        instructorId
      )
    ) {
      console.log(
        "❌ Invalid instructor ID"
      );

      return res.status(400).json({
        success: false,

        message:
          "Invalid instructor ID",
      });
    }

    /* =====================================================
       3. FIND INSTRUCTOR
    ===================================================== */

    console.log(
      "\n🔍 Searching instructor in database..."
    );

    const instructor =
      await User.findOne({
        _id: instructorId,

        accountType: "Instructor",
      })
        .select(
          [
            "firstName",
            "lastName",
            "email",
            "image",
            "accountType",
            "additionalDetails",
          ].join(" ")
        )
        .populate(
          "additionalDetails"
        );

    if (!instructor) {
      console.log(
        "❌ Instructor not found"
      );

      return res.status(404).json({
        success: false,

        message:
          "Instructor not found",
      });
    }

    console.log(
      "✅ Instructor found"
    );

    console.log(
      "📧 Instructor email:",
      instructor.email
    );

    console.log(
      "👤 Instructor name:",
      instructor.firstName,
      instructor.lastName
    );

    /* =====================================================
       4. FIND ALL COURSES CREATED BY INSTRUCTOR
    ===================================================== */

    console.log(
      "\n📚 Fetching instructor courses..."
    );

    const courses =
      await Course.find({
        instructor: instructorId,
      })
        .select(
          [
            "courseName",
            "courseDescription",
            "thumbnail",
            "price",
            "status",
            "studentsEnrolled",
            "ratingAndReviews",
            "createdAt",
          ].join(" ")
        )
        .lean();

    console.log(
      "✅ Courses fetched"
    );

    console.log(
      "📚 Total courses:",
      courses.length
    );

    /* =====================================================
       5. BASIC COURSE STATISTICS
    ===================================================== */

    const totalCourses =
      courses.length;

    const publishedCourses =
      courses.filter(
        (course) =>
          course.status ===
          "Published"
      ).length;

    const draftCourses =
      courses.filter(
        (course) =>
          course.status === "Draft"
      ).length;

    console.log(
      "\n📊 COURSE STATS"
    );

    console.log(
      "📚 Total:",
      totalCourses
    );

    console.log(
      "🌍 Published:",
      publishedCourses
    );

    console.log(
      "📝 Draft:",
      draftCourses
    );

    /* =====================================================
       6. TOTAL ENROLLMENTS + UNIQUE STUDENTS
    ===================================================== */

    console.log(
      "\n👥 Calculating student analytics..."
    );

    let totalEnrollments = 0;

    const uniqueStudentIds =
      new Set();

    courses.forEach((course) => {
      const students =
        Array.isArray(
          course.studentsEnrolled
        )
          ? course.studentsEnrolled
          : [];

      totalEnrollments +=
        students.length;

      students.forEach(
        (studentId) => {
          if (studentId) {
            uniqueStudentIds.add(
              studentId.toString()
            );
          }
        }
      );
    });

    const uniqueStudents =
      uniqueStudentIds.size;

    console.log(
      "👥 Total enrollments:",
      totalEnrollments
    );

    console.log(
      "🧑 Unique students:",
      uniqueStudents
    );

    /* =====================================================
       7. GET COURSE IDS
    ===================================================== */

    const courseIds =
      courses.map(
        (course) => course._id
      );

    console.log(
      "\n🆔 Course IDs prepared:",
      courseIds.length
    );

    /* =====================================================
       8. RATING ANALYTICS

       IMPORTANT:
       Keep actual decimal ratings here.

       Example:
       3.5 + 4.5 = average 4.0

       We do NOT round before calculating average.
    ===================================================== */

    console.log(
      "\n⭐ Calculating rating analytics..."
    );

    let averageRating = 0;

    let totalReviews = 0;

    if (courseIds.length > 0) {
      const ratingStats =
        await RatingAndReviews.aggregate([
          {
            $match: {
              course: {
                $in: courseIds,
              },
            },
          },

          /* -----------------------------------------------
             Convert rating safely to number.

             This also protects against old database values
             accidentally stored as strings.
          ------------------------------------------------ */

          {
            $project: {
              numericRating: {
                $convert: {
                  input: "$rating",

                  to: "double",

                  onError: null,

                  onNull: null,
                },
              },
            },
          },

          /* -----------------------------------------------
             Ignore invalid/null ratings
          ------------------------------------------------ */

          {
            $match: {
              numericRating: {
                $ne: null,
              },
            },
          },

          /* -----------------------------------------------
             Calculate true average and review count
          ------------------------------------------------ */

          {
            $group: {
              _id: null,

              averageRating: {
                $avg:
                  "$numericRating",
              },

              totalReviews: {
                $sum: 1,
              },
            },
          },
        ]);

      console.log(
        "📊 Rating aggregation result:",
        ratingStats
      );

      if (
        ratingStats.length > 0
      ) {
        const rawAverage =
          Number(
            ratingStats[0]
              .averageRating
          ) || 0;

        averageRating =
          Number(
            rawAverage.toFixed(1)
          );

        totalReviews =
          Number(
            ratingStats[0]
              .totalReviews
          ) || 0;
      }
    }

    console.log(
      "⭐ Average rating:",
      averageRating
    );

    console.log(
      "💬 Total reviews:",
      totalReviews
    );

    /* =====================================================
       9. RATING DISTRIBUTION

       FIXED DECIMAL RATING PROBLEM

       Previous response:
       {
         1: 0,
         2: 0,
         3: 0,
         4: 0,
         5: 0,
         3.5: 1,
         4.5: 1
       }

       New response:
       {
         1: 0,
         2: 0,
         3: 0,
         4: 1,
         5: 1
       }

       Rules:
       3.5 -> 4
       4.5 -> 5
       4.2 -> 4
       3.7 -> 4
    ===================================================== */

    console.log(
      "\n📊 Calculating rating distribution..."
    );

    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    if (courseIds.length > 0) {
      const distribution =
        await RatingAndReviews.aggregate([
          /* -----------------------------------------------
             Only reviews belonging to instructor courses
          ------------------------------------------------ */

          {
            $match: {
              course: {
                $in: courseIds,
              },
            },
          },

          /* -----------------------------------------------
             Safely convert rating to number
          ------------------------------------------------ */

          {
            $project: {
              numericRating: {
                $convert: {
                  input: "$rating",

                  to: "double",

                  onError: null,

                  onNull: null,
                },
              },
            },
          },

          /* -----------------------------------------------
             Remove invalid ratings
          ------------------------------------------------ */

          {
            $match: {
              numericRating: {
                $ne: null,
              },
            },
          },

          /* -----------------------------------------------
             Convert decimal rating to nearest whole star

             3.5 -> 4
             4.5 -> 5
          ------------------------------------------------ */

          {
            $project: {
              ratingBucket: {
                $round: [
                  "$numericRating",
                  0,
                ],
              },
            },
          },

          /* -----------------------------------------------
             Only accept valid star buckets
          ------------------------------------------------ */

          {
            $match: {
              ratingBucket: {
                $gte: 1,
                $lte: 5,
              },
            },
          },

          /* -----------------------------------------------
             Count reviews per star bucket
          ------------------------------------------------ */

          {
            $group: {
              _id:
                "$ratingBucket",

              count: {
                $sum: 1,
              },
            },
          },

          /* -----------------------------------------------
             Highest rating first
          ------------------------------------------------ */

          {
            $sort: {
              _id: -1,
            },
          },
        ]);

      console.log(
        "📊 Raw bucketed rating distribution:",
        distribution
      );

      distribution.forEach(
        (item) => {
          const ratingKey =
            Number(item._id);

          const count =
            Number(item.count) || 0;

          if (
            Number.isInteger(
              ratingKey
            ) &&
            ratingKey >= 1 &&
            ratingKey <= 5
          ) {
            ratingDistribution[
              ratingKey
            ] = count;
          }
        }
      );
    }

    console.log(
      "⭐ Final rating distribution:",
      ratingDistribution
    );

    const distributionTotal =
      Object.values(
        ratingDistribution
      ).reduce(
        (sum, count) =>
          sum +
          (Number(count) || 0),
        0
      );

    console.log(
      "🔢 Distribution total:",
      distributionTotal
    );

    console.log(
      "💬 Expected total reviews:",
      totalReviews
    );

    if (
      distributionTotal !==
      totalReviews
    ) {
      console.warn(
        "⚠️ WARNING: Distribution total does not match total reviews"
      );

      console.warn(
        "⚠️ Distribution total:",
        distributionTotal
      );

      console.warn(
        "⚠️ Total reviews:",
        totalReviews
      );
    } else {
      console.log(
        "✅ Rating distribution matches total reviews"
      );
    }

    /* =====================================================
       10. ESTIMATED REVENUE

       NOTE:
       This remains estimated revenue only.

       Accurate earnings should eventually come from
       payment transaction records.
    ===================================================== */

    console.log(
      "\n💰 Calculating estimated revenue..."
    );

    const estimatedRevenue =
      courses.reduce(
        (total, course) => {
          const price =
            Number(course.price) || 0;

          const enrolledCount =
            Array.isArray(
              course.studentsEnrolled
            )
              ? course
                  .studentsEnrolled
                  .length
              : 0;

          return (
            total +
            price * enrolledCount
          );
        },
        0
      );

    console.log(
      "💰 Estimated revenue:",
      estimatedRevenue
    );

    /* =====================================================
       11. COURSE PERFORMANCE
    ===================================================== */

    console.log(
      "\n📈 Building course performance..."
    );

    let coursePerformance = [];

    if (courseIds.length > 0) {
      const courseRatingStats =
        await RatingAndReviews.aggregate([
          /* -----------------------------------------------
             Reviews for instructor courses
          ------------------------------------------------ */

          {
            $match: {
              course: {
                $in: courseIds,
              },
            },
          },

          /* -----------------------------------------------
             Safely convert rating
          ------------------------------------------------ */

          {
            $project: {
              course: 1,

              numericRating: {
                $convert: {
                  input: "$rating",

                  to: "double",

                  onError: null,

                  onNull: null,
                },
              },
            },
          },

          /* -----------------------------------------------
             Remove invalid ratings
          ------------------------------------------------ */

          {
            $match: {
              numericRating: {
                $ne: null,
              },
            },
          },

          /* -----------------------------------------------
             Group by course
          ------------------------------------------------ */

          {
            $group: {
              _id: "$course",

              averageRating: {
                $avg:
                  "$numericRating",
              },

              totalReviews: {
                $sum: 1,
              },
            },
          },
        ]);

      console.log(
        "⭐ Per-course rating stats:",
        courseRatingStats
      );

      const ratingMap =
        new Map();

      courseRatingStats.forEach(
        (item) => {
          if (item?._id) {
            ratingMap.set(
              item._id.toString(),
              item
            );
          }
        }
      );

      coursePerformance =
        courses.map((course) => {
          const id =
            course._id.toString();

          const ratingData =
            ratingMap.get(id);

          const enrolledCount =
            Array.isArray(
              course.studentsEnrolled
            )
              ? course
                  .studentsEnrolled
                  .length
              : 0;

          const price =
            Number(course.price) || 0;

          const courseAverageRating =
            ratingData
              ? Number(
                  (
                    Number(
                      ratingData
                        .averageRating
                    ) || 0
                  ).toFixed(1)
                )
              : 0;

          return {
            courseId:
              course._id,

            courseName:
              course.courseName,

            courseDescription:
              course.courseDescription,

            thumbnail:
              course.thumbnail,

            price,

            status:
              course.status,

            studentsEnrolled:
              enrolledCount,

            averageRating:
              courseAverageRating,

            totalReviews:
              Number(
                ratingData
                  ?.totalReviews
              ) || 0,

            estimatedRevenue:
              price *
              enrolledCount,
          };
        });
    }

    console.log(
      "📈 Course performance prepared:",
      coursePerformance.length
    );

    console.log(
      "📈 Course performance data:",
      coursePerformance
    );

    /* =====================================================
       12. RECENT REVIEWS
    ===================================================== */

    console.log(
      "\n💬 Fetching recent reviews..."
    );

    let recentReviews = [];

    if (courseIds.length > 0) {
      recentReviews =
        await RatingAndReviews.find({
          course: {
            $in: courseIds,
          },
        })
          .sort({
            _id: -1,
          })
          .limit(5)
          .populate({
            path: "user",

            select:
              "firstName lastName image",
          })
          .populate({
            path: "course",

            select:
              "courseName",
          })
          .lean();
    }

    console.log(
      "💬 Recent reviews found:",
      recentReviews.length
    );

    console.log(
      "💬 Raw recent reviews:",
      recentReviews
    );

    const formattedRecentReviews =
      recentReviews.map(
        (review) => {
          const firstName =
            review.user
              ?.firstName || "";

          const lastName =
            review.user
              ?.lastName || "";

          const studentName =
            `${firstName} ${lastName}`.trim();

          return {
            reviewId:
              review._id,

            studentName:
              studentName ||
              "Unknown Student",

            studentImage:
              review.user
                ?.image || null,

            courseName:
              review.course
                ?.courseName ||
              "Unknown Course",

            rating:
              Number(
                review.rating
              ) || 0,

            review:
              review.review ||
              "No written review provided",
          };
        }
      );

    console.log(
      "✅ Formatted recent reviews:",
      formattedRecentReviews
    );

    /* =====================================================
       13. FINAL RESPONSE
    ===================================================== */

    const dashboardData = {
      instructor: {
        _id:
          instructor._id,

        firstName:
          instructor.firstName,

        lastName:
          instructor.lastName,

        email:
          instructor.email,

        image:
          instructor.image,

        accountType:
          instructor.accountType,

        additionalDetails:
          instructor.additionalDetails,
      },

      stats: {
        totalCourses,

        publishedCourses,

        draftCourses,

        totalEnrollments,

        uniqueStudents,

        averageRating,

        totalReviews,

        estimatedRevenue,
      },

      ratingDistribution,

      coursePerformance,

      recentReviews:
        formattedRecentReviews,
    };

    /* =====================================================
       14. FINAL DEBUG LOGS
    ===================================================== */

    console.log(
      "\n========================================"
    );

    console.log(
      "✅ INSTRUCTOR DASHBOARD SUCCESS"
    );

    console.log(
      "========================================"
    );

    console.log(
      "📊 Final stats:",
      dashboardData.stats
    );

    console.log(
      "⭐ Final distribution:",
      dashboardData.ratingDistribution
    );

    console.log(
      "📈 Course performance count:",
      dashboardData
        .coursePerformance
        .length
    );

    console.log(
      "💬 Recent reviews count:",
      dashboardData
        .recentReviews
        .length
    );

    console.log(
      "========================================\n"
    );

    /* =====================================================
       15. SEND RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Instructor dashboard fetched successfully",

      data: dashboardData,
    });
  } catch (error) {
    console.log(
      "\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "❌ INSTRUCTOR DASHBOARD ERROR"
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.error(
      "Error name:",
      error.name
    );

    console.error(
      "Error message:",
      error.message
    );

    console.error(
      "Error stack:",
      error.stack
    );

    console.error(
      "Full error:",
      error
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"
    );

    return res.status(500).json({
      success: false,

      message:
        "Unable to fetch instructor dashboard",

      error:
        error.message,
    });
  }
};