import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import '../styles/Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(t('contact.formSuccess', 'Form submitted successfully!'));
  };

  return (
    <div className="contact-page">
      <HeroSection 
        title={t('contact.title', 'Contact Us')}
        subtitle={t('contact.subtitle', 'Reach out to the ShreeRampur Gram Panchayat')}
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
                    <p>{t('contact.address.line1', 'Gram Panchayat Office, ShreeRampur,')}<br />{t('contact.address.line2', 'District: Pune, Maharashtra - 412108')}</p>
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
                    <p>{t('contact.email.primary', 'grampanchayat.shreerampur@gov.in')}<br />{t('contact.email.sarpanch', 'sarpanch.shreerampur@gov.in')}</p>
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
                  <input type="text" id="name" name="name" required autoComplete="off" inputMode="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email', 'Email Address')}</label>
                  <input type="email" id="email" name="email" required autoComplete="off" inputMode="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.form.phone', 'Phone Number')}</label>
                  <input type="tel" id="phone" name="phone" required autoComplete="off" inputMode="tel" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject', 'Subject')}</label>
                  <input type="text" id="subject" name="subject" required autoComplete="off" inputMode="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message', 'Your Message')}</label>
                  <textarea id="message" name="message" rows={5} required autoComplete="off" inputMode="text" style={{fontFamily: 'inherit'}}></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <Send size={16} />
                  {t('contact.form.submit', 'Send Message')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('contact.map.title', 'Find Us')}</h2>
            <p>{t('contact.map.subtitle', 'Visit our office in ShreeRampur village')}</p>
          </div>
          <div className="map-container">
            <iframe
              title="ShreeRampur Village Location"
              src="https://www.google.com/maps?q=ShreeRampur,+Maharashtra,+India&output=embed"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="directions">
            <h3>{t('contact.map.directionsTitle', 'How to Reach Us')}</h3>
            <div className="direction-options">
              <div className="direction-option">
                <h4>{t('contact.map.byBus', 'By Bus')}</h4>
                <p>{t('contact.map.byBusDesc', 'Take state transport bus to ShreeRampur bus stop. The Panchayat office is 500m from the bus stop.')}</p>
              </div>
              <div className="direction-option">
                <h4>{t('contact.map.byCar', 'By Car')}</h4>
                <p>{t('contact.map.byCarDesc', 'From Pune, take the Pune-Solapur highway and turn at ShreeRampur junction. Follow the signboards to reach the village center.')}</p>
              </div>
              <div className="direction-option">
                <h4>{t('contact.map.byTrain', 'By Train')}</h4>
                <p>{t('contact.map.byTrainDesc', 'The nearest railway station is Hadapsar (15 km). Take an auto-rickshaw or bus to reach ShreeRampur.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feedback-section">
        <div className="container">
          <div className="feedback-content">
            <h2>{t('contact.feedback.title', 'Your Feedback Matters')}</h2>
            <p>{t('contact.feedback.description', 'We value your suggestions and feedback to improve our services. Please share your thoughts to help us serve you better.')}</p>
            <button className="btn-secondary">{t('contact.feedback.button', 'Give Feedback')}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;