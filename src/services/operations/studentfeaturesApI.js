import { studentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzplogo from "../../assets/images.png";

import { setPaymentLoading } from "../../Slices/paymentSlice";
import { resetCart } from "../../Slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () =>
      reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  courseId,
  token,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Redirecting to payment gateway...");

  try {
    // Load Razorpay script
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!courseId || !token || !userDetails) {
      toast.error("Invalid course or user details");
      return;
    }

    // Create order from backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.orderId) {
      toast.error("Failed to initiate payment");
      return;
    }

    const { orderId, amount } = orderResponse.data;

    console.log("Order received from backend:", orderResponse.data);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Test key
      order_id: orderId, // IMPORTANT: only this is required
      name: "StudyFlux",
      description: "Thank you for purchasing the course",
      image: rzplogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        console.log("Payment Success Response:", response);

        sendPaymentSuccessMail(response, amount, token);
        verifyPayment(
          { ...response, courseId },
          token,
          navigate,
          dispatch
        );
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment Error:", error);
    toast.error("Something went wrong while processing payment");
  } finally {
    toast.dismiss(toastId);
  }
}

async function sendPaymentSuccessMail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        amount: amount / 100,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Payment successful! Confirmation email sent.");
  } catch (error) {
    console.error("Email Error:", error);
    toast.error("Payment successful but email failed.");
  }
}

export async function verifyPayment(
  paymentData,
  token,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      paymentData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.success("Payment verified successfully!");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
    } else {
      toast.error("Payment verification failed.");
    }
  } catch (error) {
    console.error("Verification Error:", error);
    toast.error("Error verifying payment.");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
