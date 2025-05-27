import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true, // SSL
    port: 465,
    logger: true, // Enable detailed logging
  });

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : process.env.NEXT_PUBLIC_LOCAL;
  const resetUrl = `${baseUrl}?reset=${token}`;

  try {
    const resend = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Reset your password",
      html: `<p>You requested to reset your password. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
    //console.log("resend", resend);
  } catch (error) {
    // console.error("Error sending email:", error);
  }
};

export const sendScheduleReminderEmail = async (
  to: string[],
  message: string
) => {
  console.log("process.env.EMAIL_FROM", process.env.EMAIL_FROM);
  console.log("process.env.EMAIL_PASSWORD", process.env.EMAIL_PASSWORD);
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true, // SSL
    port: 465,
    logger: true, // Enable detailed logging
  });

  // Construct the base URL and site name from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "";

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Schedule Reminder</title>
      <style>
        body {
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Helvetica Neue", "Helvetica", sans-serif;
          background-color: #f7fafc;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: var(--primary-500);
          padding: 20px;
          text-align: center;
        }
        .email-header img {
          width: 48px;
          height: 48px;
          margin-bottom: 10px;
        }
        .email-header h1 {
          color: #ffffff;
          font-size: 24px;
          margin: 0;
        }
        .email-body {
          padding: 20px;
          color: #1a1a1a;
        }
        .email-body p {
          font-size: 16px;
          line-height: 1.5;
          margin: 0 0 20px;
        }
        .email-footer {
          background-color: var(--primary-50);
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666666;
        }
        .email-footer a {
          color: var(--primary-500);
          text-decoration: none;
        }
        .email-footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <img src="${baseUrl}/icon-192x192.png" alt="${siteName} Logo" />
          <h1>Schedule Reminder</h1>
        </div>
        <div class="email-body">
          <p>Hello,</p>
          <p>${message}</p>
          <p>If you have any questions or need further assistance, please feel free to contact us.</p>
        </div>
        <div class="email-footer">
          <p>Best regards,</p>
          <p><strong>${siteName}</strong></p>
          <p><a href="${baseUrl}">Visit our website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const resend = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to.join(", "), // Join the array of emails into a single string
      subject: "Schedule Reminder",
      html: emailHtml,
    });
    console.log("Email sent successfully:", resend);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
