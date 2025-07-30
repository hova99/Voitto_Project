import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroBanner
        title="Contact Us"
        subtitle="Get in touch for quotes, orders, or any questions"
        backgroundImage="https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753615789/wheel-3853539_1920_gllesv.jpg"
        overlayText="Need an Excavator? We’ve Got You Covered"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-6 sm:mb-8">Get in Touch</h2>
            <div className="space-y-4 sm:space-y-6">
              <ContactItem
                icon={<Phone className="h-6 w-6 text-white" />}
                title="Phone"
                content="+254 727 530944"
                note="Available 24/7 for emergencies"
              />
              <ContactItem
                icon={<Mail className="h-6 w-6 text-white" />}
                title="Email"
                content="voittoltd2023@gmail.com"
                note="We'll respond within 24 hours"
              />
              <ContactItem
                icon={<MapPin className="h-6 w-6 text-white" />}
                title="Location"
                content="Mashambani, Banana, Kiambu"
                note="Kenya"
              />
              <ContactItem
                icon={<Clock className="h-6 w-6 text-white" />}
                title="Business Hours"
                content={
                  <>
                    Monday - Friday: 6:00 AM - 6:00 PM <br />
                    Saturday: 6:00 AM - 4:00 PM <br />
                    Sunday: Emergency orders only
                  </>
                }
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} required />
              <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              <InputField label="Phone Number *" name="phone" type="tel" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={handleInputChange} required />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a subject</option>
                  <option value="quote">Request a Quote</option>
                  <option value="order">Place an Order</option>
                  <option value="delivery">Delivery Inquiry</option>
                  <option value="quality">Quality Concern</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or requirements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Find Us</h2>
            <p className="text-gray-600 mb-6">
              Visit our yard in Mashambani, Banana, Kiambu to see our materials firsthand and speak with our experts.
            </p>
          </div>
          <div className="h-[600px] w-full">
            <iframe
              title="Voitto Concrete Works Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.8336845360525!2d36.74988535962528!3d-1.1647037369551296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f2338a66f2b39%3A0x628a8ef6e30dd21a!2sVoitto%20concrete%20works!5e0!3m2!1sen!2snl!4v1753528678267!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const ContactItem = ({
  icon,
  title,
  content,
  note
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  note?: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="bg-orange-600 p-3 rounded-lg">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{content}</p>
      {note && <p className="text-sm text-gray-500">{note}</p>}
    </div>
  </div>
);

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    />
  </div>
);

export default ContactPage;
