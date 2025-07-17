exports.otpEmailTemplate = (otp) => {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color: #4F46E5; text-align: center;">StudyFlux - Email Verification</h2>
      <p>Hello,</p>
      <p>Thank you for signing up on <strong>StudyFlux</strong>! To verify your email address, please use the following OTP:</p>
      <h1 style="text-align: center; color: #10B981; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
      <p style="text-align: center;">This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
      <hr />
      <p style="font-size: 14px; color: #555;">If you didn’t request this, you can safely ignore this email.</p>
      <p style="font-size: 14px; color: #555;">Regards,<br/>Team StudyFlux</p>
    </div>
  `;
};
