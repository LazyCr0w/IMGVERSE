import { useState } from 'react';
import {
  MdOutlineMail,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdOutlineSend
} from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function ContactPage() {
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     subject: '',
     message: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitMessage, setSubmitMessage] = useState('');
   const [hasSupported, setHasSupported] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Support Me Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="minimal-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wider mb-6">
              SUPPORT ME
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              If you find IMGVERSE helpful, consider supporting the development and maintenance of this project.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Buy Me a Coffee */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L13.09 8.26L20 9L15 14L16.18 21L10 17.77L3.82 21L5 14L0 9L6.91 8.26L10 2Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Buy Me a Coffee</h3>
                <p className="text-gray-600 text-sm mb-4">Support with a one-time donation</p>
                <a
                  href="https://buymeacoffee.com/lazycr0w"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasSupported(true)}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Buy Coffee
                </a>
              </div>

              {/* GitHub Sponsors */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaGithub className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">GitHub Sponsors</h3>
                <p className="text-gray-600 text-sm mb-4">Monthly sponsorship for ongoing support</p>
                <a
                  href="https://github.com/sponsors/LazyCr0w"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasSupported(true)}
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sponsor
                </a>
              </div>
            </div>

            {/* Thank You Section - Only show after support */}
            {hasSupported && (
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center animate-fadeIn">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your support means the world to me and helps keep IMGVERSE free and continuously improved for everyone.
                  Every contribution, no matter how small, makes a difference.
                </p>
                <div className="text-sm text-gray-500">
                  Made with ❤️ by LazyCr0w
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                Your support helps keep IMGVERSE free and continuously improved for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="minimal-container py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 tracking-wider mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or partnership opportunities? We'd love to hear from you.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Contact Form - Left Side */}
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full minimal-btn px-8 py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <MdOutlineSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information - Right Side */}
            <div className="md:col-span-1 space-y-8">

              {/* Contact Details */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MdOutlineMail className="text-2xl text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">Email</div>
                      <div className="text-gray-600">sd.sumon.deb.2001@gmail.com</div>
                      <div className="text-sm text-gray-500 mt-1">We respond within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MdOutlineLocationOn className="text-2xl text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">Location</div>
                      <div className="text-gray-600">Assam, India</div>
                      <div className="text-sm text-gray-500 mt-1">Solo Developer</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MdOutlineAccessTime className="text-2xl text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">Support Hours</div>
                      <div className="text-gray-600">24/7 for all users</div>
                      <div className="text-sm text-gray-500 mt-1">Always here to help</div>
                    </div>
                  </div>
        
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.linkedin.com/in/sumon-deb-742346314/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200 group"
                  >
                    <FaLinkedin className="text-2xl text-blue-700 group-hover:text-blue-800" />
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-blue-700">LinkedIn</div>
                      <div className="text-gray-600">Sumon Deb</div>
                      <div className="text-sm text-gray-500 mt-1">Professional network</div>
                    </div>
                  </a>
                  <a
                    href="https://github.com/LazyCr0w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200 group"
                  >
                    <FaGithub className="text-2xl text-gray-800 group-hover:text-gray-900" />
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-gray-900">GitHub</div>
                      <div className="text-gray-600">@LazyCr0w</div>
                      <div className="text-sm text-gray-500 mt-1">Open source projects</div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="minimal-container">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 tracking-wider mb-4">
              IMGVERSE
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Revolutionizing image discovery through multi-source aggregation and beautiful design.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-gray-700 transition-colors">Cookie Policy</a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              © 2024 IMGVERSE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContactPage;