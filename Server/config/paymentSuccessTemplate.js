// config/paymentSuccessTemplate.js

const paymentSuccessTemplate = (name, amount, paymentId, orderId) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
      <h2 style="color: #2e7d32;">✅ Payment Successful</h2>
      <p>Hi ${name},</p>
      <p>We're happy to confirm that your payment has been successfully processed.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Amount Paid:</td>
          <td style="padding: 8px;">₹${(amount ).toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Payment ID:</td>
          <td style="padding: 8px;">${paymentId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Order ID:</td>
          <td style="padding: 8px;">${orderId}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">Thank you for your purchase! We're excited to have you onboard.</p>
      <p>Best regards,<br><strong>The StudyFlux Team</strong></p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply.</p>
    </div>
  `;
};

module.exports = paymentSuccessTemplate;
