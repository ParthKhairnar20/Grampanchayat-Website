import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import '../styles/Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: t('contact.formSuccess', 'Message sent successfully! We will get back to you soon.') });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitMessage({ type: 'error', text: data.error || t('contact.formError', 'Failed to send message. Please try again.') });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage({ type: 'error', text: t('contact.formError', 'Network error. Please try again.') });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      <HeroSection 
        title={t('contact.title', 'Contact Us')}
        subtitle={t('contact.subtitle', 'Reach out to the Janori Gram Panchayat')}
        backgroundImage="https://images.pexels.com/photos/1655901/pexels-photo-1655901.jpeg"
      />

      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2>{t('contact.getInTouch.title', 'Get in Touch')}</h2>
              <p>{t('contact.getInTouch.description', 'We are here to assist you with any queries or concerns. Feel free to reach out to us through any of the following channels:')}</p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={24} className="contact-icon" />
                  <div className="contact-text">
                    <h3>{t('contact.address.title', 'Our Address')}</h3>
                    <p>{t('contact.address.line1', 'At post Janori Tq. Shegaon Dist buldhana')}<br />{t('contact.address.line2', 'Pin no. 444203')}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={24} className="contact-icon" />
                  <div className="contact-text">
                    <h3>{t('contact.phone.title', 'Phone Numbers')}</h3>
                    <p>{t('contact.phone.office', 'Office: +91 2345 678901')}<br />{t('contact.phone.sarpanch', 'Sarpanch: +91 98765 43210')}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={24} className="contact-icon" />
                  <div className="contact-text">
                    <h3>{t('contact.email.title', 'Email Address')}</h3>
                    <p>{t('contact.email.primary', 'grampanchayat.janori@gov.in')}<br />{t('contact.email.sarpanch', 'sarpanch.janori@gov.in')}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Clock size={24} className="contact-icon" />
                  <div className="contact-text">
                    <h3>{t('contact.hours.title', 'Office Hours')}</h3>
                    <p>{t('contact.hours.weekdays', 'Monday to Saturday: 10:00 AM - 5:00 PM')}<br />{t('contact.hours.holidays', 'Sunday & Public Holidays: Closed')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <h2>{t('contact.form.title', 'Send us a Message')}</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name', 'Full Name')}</label>
                  <input type="text" id="name" name="name" required autoComplete="off" inputMode="text" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email', 'Email Address')}</label>
                  <input type="email" id="email" name="email" required autoComplete="off" inputMode="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.form.phone', 'Phone Number')}</label>
                  <input type="tel" id="phone" name="phone" required autoComplete="off" inputMode="tel" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject', 'Subject')}</label>
                  <input type="text" id="subject" name="subject" required autoComplete="off" inputMode="text" value={formData.subject} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message', 'Your Message')}</label>
                  <textarea id="message" name="message" rows={5} required autoComplete="off" inputMode="text" style={{fontFamily: 'inherit'}} value={formData.message} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.submitting', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.form.submit', 'Send Message')}
                    </>
                  )}
                </button>
                                 {submitMessage && (
                   <div className={`submit-message ${submitMessage.type === 'success' ? 'success' : 'error'}`}>
                     {submitMessage.text}
                   </div>
                 )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('contact.map.title', 'Find Us')}</h2>
            <p>{t('contact.map.subtitle', 'Visit our office in Janori village')}</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15057.534307881755!2d76.6912!3d20.5937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM1JzM0LjciTiA3NsKwNDEnMjguMyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;