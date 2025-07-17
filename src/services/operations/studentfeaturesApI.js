import { studentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzplogo from "../../assets/images.png";
// Removed import of server-side controller

import { setPaymentLoading } from "../../Slices/paymentSlice";
import { resetCart } from "../../Slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        console.log(`[loadScript] Loading script from: ${src}`);
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
            console.log("[loadScript] Script loaded successfully");
            resolve(true);
        };
        script.onerror = () => {
            console.error(`[loadScript] Failed to load script: ${src}`);
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.body.appendChild(script);
    });
}

export async function buyCourse(courseId, token, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Redirecting to payment gateway...");
    try {
        console.log("[buyCourse] Starting payment process");
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            console.error("[buyCourse] Payment gateway script failed to load");
            toast.error("Failed to load payment gateway script");
            return;
        }

        if (!courseId || !token || !userDetails) {
            console.error("[buyCourse] Missing required parameters:", { courseId, token, userDetails });
            toast.error("Invalid course or user details");
            return;
        }

        console.log("[buyCourse] Sending token in header:", `Bearer ${token}`);

       console.log("Sending Authorization header:", `Bearer ${token}`);
      console.log("[buyCourse] Token being sent:", token);

        const orderResponse = await apiConnector(
    "POST",
    COURSE_PAYMENT_API,
    { courseId },
   {
  Authorization: `Bearer ${token}`,
    }
);


        console.log("[buyCourse] Order response:", orderResponse);

        if (!orderResponse || !orderResponse.data) {
            console.error("[buyCourse] Failed to get valid order response");
            toast.error("Failed to initiate payment");
            return;
        }

        const key = process.env.REACT_APP_RAZORPAY_KEY;
        console.log("[buyCourse] Razorpay key:", key);

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.currency,
            amount: `${orderResponse.data.amount}`,
            order_id: orderResponse.data.orderId,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzplogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                console.log("[buyCourse] Razorpay payment handler response:", response);
                sendPaymentSuccessMail(response, orderResponse.data.amount, token);
                verifyPayment({ ...response, courseId }, token, navigate, dispatch);
            },
            modal: {
                ondismiss: function () {
                    console.log("[buyCourse] Payment popup closed by user");
                    toast.error("Payment cancelled");
                },
            },
        };

        console.log("[buyCourse] Creating Razorpay payment object with options:", options);

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("[buyCourse] Error during payment process:", error);
        toast.error("An error occurred while processing the payment. Please try again.");
    } finally {
        toast.dismiss(toastId);
    }
}

async function sendPaymentSuccessMail(response, amount, token) {
    try {
        console.log("[sendPaymentSuccessMail] Sending payment success email with data:", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: amount / 100,
        });

        const emailResponse = await apiConnector(
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

        console.log("[sendPaymentSuccessMail] Email API response:", emailResponse);

        if (emailResponse.status === 200) {
            toast.success("Payment successful! A confirmation email has been sent.");
        } else {
            toast.error("Payment successful but failed to send confirmation email.");
        }
    } catch (error) {
        console.error("[sendPaymentSuccessMail] Error sending payment success email:", error);
        toast.error("An error occurred while sending the confirmation email.");
    }
}

// ✅ This is the correct verifyPayment (frontend-only)
export async function verifyPayment(paymentData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
        console.log("[verifyPayment] Verifying payment with data:", paymentData);
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            paymentData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("[verifyPayment] Payment verification response:", response);

        if (response.status === 200) {
            toast.success("Payment verified successfully!");
            navigate("/dashboard/enrolled-courses");
            dispatch({ type: "PAYMENT_VERIFIED", payload: response.data });
            dispatch(resetCart());
        } else {
            toast.error("Payment verification failed. Please try again.");
        }
    } catch (error) {
        console.error("[verifyPayment] Error verifying payment:", error);
        toast.error("An error occurred while verifying the payment. Please try again.");
    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}
