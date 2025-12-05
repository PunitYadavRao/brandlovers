import React, { useState } from 'react';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 font-light">
              We'd love to hear from you. Send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200 p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us more..."
                      disabled={isSubmitting}
                      className={`w-full px-4 py-2 border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    className="w-full md:w-auto px-8"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6">
                  Contact Info
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <FiMail className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Email</h4>
                      <a href="mailto:support@brandlovers.com" className="text-gray-600 hover:text-black transition-colors">
                        support@brandlovers.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <FiPhone className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-black transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <FiMapPin className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Address</h4>
                      <p className="text-gray-600">
                        123 Fashion Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6">
                  Follow Us
                </h3>

                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="w-5 h-5" />
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FiFacebook className="w-5 h-5" />
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mon - Fri</span>
                    <span className="font-medium text-black">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-black">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-black">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;