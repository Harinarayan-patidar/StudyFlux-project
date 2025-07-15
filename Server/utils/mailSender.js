// mailSender.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465, // for SSL
            secure: true, // Use SSL
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, 
            },
        });

        console.log("Preparing to send email");

        let info = await transporter.sendMail({
            from: 'StudyNotion || Harinarayan',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email sent successfully:", info);
        return info;  // Return info for further processing or logging

    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;  // Throw the error for proper handling
    }
}

module.exports = mailSender;
