// mailSender.js

require("dotenv").config();
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("==================================================");
    console.log("📨 Preparing to send email...");
    console.log("📧 Receiver:", email);
    console.log("📝 Subject:", title);
    console.log("==================================================");

    // Create transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp.gmail.com
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS, // app password
      },
    });

    console.log("🚀 Transporter created successfully");

    // Send email
    const info = await transporter.sendMail({
      from: `"StudyFlux" <${process.env.MAIL_USER}>`,
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

    console.log("✅ Email sent successfully");
    console.log("📨 Mail Response:", info);
    console.log("==================================================");

    return info;

  } catch (error) {
    console.log("❌ Error while sending email");
    console.error(error);
    console.log("==================================================");
    throw error;
  }
};

module.exports = mailSender;