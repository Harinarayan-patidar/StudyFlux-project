// mailSender.js
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    console.log("Preparing to send email...");

    const response = await resend.emails.send({
      from: "StudyFlux <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
            
            <h2 style="color: #4F46E5; text-align: center;">
              StudyFlux
            </h2>

            <p style="font-size: 16px; color: #333;">
              Hello,
            </p>

            <p style="font-size: 16px; color: #333;">
              ${body}
            </p>

            <hr style="margin: 20px 0;" />

            <p style="font-size: 14px; color: #777;">
              This email was sent by StudyFlux.
            </p>

            <p style="font-size: 14px; color: #777;">
              Regards,<br/>
              Harinarayan<br/>
              Founder, StudyFlux
            </p>

          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", response);
    return response;

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = mailSender;
