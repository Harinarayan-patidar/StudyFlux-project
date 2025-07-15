// emailTemplates.js

const emailTemplate = (name, courseName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Course Enrollment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 0; margin: 0;">
  <table align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
    <tr>
      <td style="background-color: #4CAF50; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0;">🎉 Enrollment Confirmed!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 18px; margin: 0 0 20px;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #333333;">We are excited to inform you that your enrollment in the course <strong>${courseName}</strong> has been successfully confirmed.</p>
        <p style="font-size: 16px; color: #333333;">Get ready to begin your learning journey and unlock new skills!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourplatform.com/dashboard" target="_blank" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
        </div>
        <p style="font-size: 14px; color: #888888;">If you have any questions or need help, feel free to contact our support team.</p>
        <p style="font-size: 14px; color: #888888;">Happy Learning!<br/>- The Team at SANDEEP Academy</p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f0f0f0; color: #888888; font-size: 12px; text-align: center; padding: 16px;">
        © ${new Date().getFullYear()} SANDEEP Academy|| STUDYFLUX. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = emailTemplate;
