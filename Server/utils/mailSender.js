require("dotenv").config();

console.log("🚀 Brevo Mail Sender Utility Loading...");

// Check environment variables at startup
if (!process.env.BREVO_API_KEY) {
  console.error(
    "❌ BREVO_API_KEY is missing from environment variables"
  );
} else {
  console.log(
    "✅ BREVO_API_KEY found in environment"
  );
}

if (!process.env.BREVO_SENDER_EMAIL) {
  console.error(
    "❌ BREVO_SENDER_EMAIL is missing"
  );
} else {
  console.log(
    "✅ BREVO_SENDER_EMAIL found:",
    process.env.BREVO_SENDER_EMAIL
  );
}

if (!process.env.BREVO_SENDER_NAME) {
  console.warn(
    "⚠️ BREVO_SENDER_NAME missing, using StudyFlux"
  );
}

/* =========================================================
   MAIL SENDER
========================================================= */

const mailSender = async (email, title, body) => {
  console.log("\n========================================");
  console.log("📨 BREVO MAIL SENDER STARTED");
  console.log("========================================");

  try {
    // Validate receiver email
    if (!email) {
      throw new Error(
        "Receiver email is required"
      );
    }

    // Validate subject
    if (!title) {
      throw new Error(
        "Email subject is required"
      );
    }

    // Validate body
    if (!body) {
      throw new Error(
        "Email body is required"
      );
    }

    // Validate API key
    if (!process.env.BREVO_API_KEY) {
      throw new Error(
        "BREVO_API_KEY is not configured"
      );
    }

    // Validate sender email
    if (!process.env.BREVO_SENDER_EMAIL) {
      throw new Error(
        "BREVO_SENDER_EMAIL is not configured"
      );
    }

    const senderName =
      process.env.BREVO_SENDER_NAME ||
      "StudyFlux";

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL;

    const receiverEmail =
      email.trim().toLowerCase();

    console.log("📧 Receiver:", receiverEmail);
    console.log("📝 Subject:", title);
    console.log("👤 Sender Name:", senderName);
    console.log("📤 Sender Email:", senderEmail);

    console.log("----------------------------------------");
    console.log("🌐 Preparing Brevo HTTPS API request...");
    console.log("----------------------------------------");

    // Complete email HTML
    const htmlContent = `
      <!DOCTYPE html>

      <html>
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              padding: 30px 15px;
              background-color: #f4f4f4;
            "
          >
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
              "
            >
              <!-- StudyFlux Header -->

              <h1
                style="
                  margin-top: 0;
                  color: #4F46E5;
                  text-align: center;
                "
              >
                StudyFlux
              </h1>

              <!-- Greeting -->

              <p
                style="
                  font-size: 16px;
                  color: #333333;
                "
              >
                Hello,
              </p>

              <!-- Dynamic Email Body -->

              <div
                style="
                  font-size: 16px;
                  color: #333333;
                  line-height: 1.6;
                "
              >
                ${body}
              </div>

              <!-- Divider -->

              <hr
                style="
                  margin: 30px 0;
                  border: none;
                  border-top: 1px solid #eeeeee;
                "
              />

              <!-- Footer -->

              <p
                style="
                  font-size: 13px;
                  color: #777777;
                "
              >
                This email was sent by StudyFlux.
              </p>

              <p
                style="
                  font-size: 13px;
                  color: #777777;
                "
              >
                Regards,
                <br />

                Harinarayan
                <br />

                StudyFlux
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Brevo API payload
    const payload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },

      to: [
        {
          email: receiverEmail,
        },
      ],

      subject: title,

      htmlContent: htmlContent,
    };

    console.log("📦 Brevo payload prepared");

    // Never log API key
    console.log(
      "🔑 API Key:",
      "Present but hidden for security"
    );

    console.log(
      "🚀 Sending request to Brevo API..."
    );

    // Send email through HTTPS API
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",

          "content-type":
            "application/json",

          "api-key":
            process.env.BREVO_API_KEY,
        },

        body: JSON.stringify(payload),
      }
    );

    console.log(
      "📡 Brevo HTTP Status:",
      response.status
    );

    console.log(
      "📡 Brevo HTTP Status Text:",
      response.statusText
    );

    // Parse response safely
    let responseData;

    try {
      responseData = await response.json();
    } catch (jsonError) {
      console.warn(
        "⚠️ Could not parse Brevo response as JSON"
      );

      responseData = null;
    }

    console.log(
      "📨 Brevo Response Data:",
      responseData
    );

    // Handle API errors
    if (!response.ok) {
      console.log(
        "❌ BREVO API RETURNED ERROR"
      );

      console.error(
        "Status:",
        response.status
      );

      console.error(
        "Response:",
        responseData
      );

      throw new Error(
        responseData?.message ||
          `Brevo API error: ${response.status}`
      );
    }

    console.log("----------------------------------------");
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("----------------------------------------");

    console.log(
      "📨 Message ID:",
      responseData?.messageId
    );

    console.log(
      "📧 Receiver:",
      receiverEmail
    );

    console.log("========================================");
    console.log("🎉 BREVO MAIL PROCESS COMPLETED");
    console.log("========================================\n");

    return responseData;
  } catch (error) {
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("❌ BREVO MAIL SENDER ERROR");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    console.error(
      "Error name:",
      error.name
    );

    console.error(
      "Error message:",
      error.message
    );

    console.error(
      "Full error:",
      error
    );

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    throw error;
  }
};

module.exports = mailSender;