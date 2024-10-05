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
