import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendContactEmail(contactData) {
  try {
    const { name, email, subject, message } = contactData;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sumon.deb.2001@gmail.com',
      subject: `IMGVERSE Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission - IMGVERSE
          </h2>

          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p><strong>Reply to:</strong> ${email}</p>
            <p>This message was sent from the IMGVERSE contact form.</p>
          </div>
        </div>
      `,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}