import { sendContactEmail } from '../services/emailService.js';

export async function submitContactForm(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Send email
    const emailResult = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    console.log('Contact form submitted successfully:', {
      name,
      email,
      subject,
      messageId: emailResult.messageId
    });

    res.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
}