
import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;          
  subject: string;
  text?: string;
  html?: string;
}

const sendEmail = async ({ to, subject, text, html }: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // <-- fixed: app email (sender)
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"My Todo App" <${process.env.EMAIL_USER}>`, // sender
    to,                                                // receiver (user)
    subject,
    text,
    html,
  });
};

export default sendEmail;
