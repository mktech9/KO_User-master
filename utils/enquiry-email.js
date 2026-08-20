import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEnquiryMail = async ({
  enquiryNo,
  name,
  email,
  mobile,
  message,
}) => {
  // Email to admin
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.INQUIRY_ADMIN_EMAIL,
    replyTo: email,
    subject: `New Enquiry - ${enquiryNo}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px;">
        <h2>New Customer Enquiry</h2>

        <p><strong>Enquiry No:</strong> ${enquiryNo}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>

        <h3>Message</h3>
        <p>${message}</p>

        <hr>

        <p>
          Reply to this email to respond directly to the customer.
        </p>
      </div>
    `,
  });

  // Auto-reply to customer
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: `Enquiry Received - ${enquiryNo}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px;">
        <h2>Thank you for contacting Krossover</h2>

        <p>Dear ${name},</p>

        <p>
          We have successfully received your enquiry.
        </p>

        <p>
          <strong>Your Enquiry Number:</strong>
          ${enquiryNo}
        </p>

        <p>
          Our team will get back to you within 24 hours.
        </p>

        <p>
          Please keep your enquiry number for future communication.
        </p>

        <br>

        <p>
          Regards,<br>
          <strong>Krossover Team</strong>
        </p>
      </div>
    `,
  });

  return true;
};