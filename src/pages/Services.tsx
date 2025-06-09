import React from 'react';
import { FileText, Calendar, Award, Users, BookOpen, Home, Heart, Percent } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import '../styles/Services.css';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      id: 1,
      icon: <FileText size={32} />,
      title: t('services.certificates.title', 'Certificate Issuance'),
      description: t('services.certificates.description', 'Birth, death, residence, income, and other essential certificates issued efficiently for village residents.')
    },
    {
      id: 2,
      icon: <Calendar size={32} />,
      title: t('services.hallBooking.title', 'Community Hall Booking'),
      description: t('services.hallBooking.description', 'Book our well-equipped community hall for various events, functions, and gatherings at affordable rates.')
    },
    {
      id: 3,
      icon: <Award size={32} />,
      title: t('services.schemes.title', 'Scheme Registration'),
      description: t('services.schemes.description', 'Assistance in applying for various government welfare schemes, subsidies, and benefits for eligible residents.')
    },
    {
      id: 4,
      icon: <Users size={32} />,
      title: t('services.dispute.title', 'Dispute Resolution'),
      description: t('services.dispute.description', 'Traditional village-level dispute resolution mechanism to resolve conflicts amicably within the community.')
    },
    {
      id: 5,
      icon: <BookOpen size={32} />,
      title: t('services.library.title', 'Library Services'),
      description: t('services.library.description', 'Access to our village library with a collection of books, newspapers, and educational resources.')
    },
    {
      id: 6,
      icon: <Home size={32} />,
      title: t('services.housing.title', 'Housing Assistance'),
      description: t('services.housing.description', 'Guidance for government housing schemes like PMAY-G for eligible beneficiaries in the village.')
    },
    {
      id: 7,
      icon: <Heart size={32} />,
      title: t('services.health.title', 'Health Services'),
      description: t('services.health.description', 'Coordination with primary health center for regular health camps and awareness programs.')
    },
    {
      id: 8,
      icon: <Percent size={32} />,
      title: t('services.tax.title', 'Tax Collection'),
      description: t('services.tax.description', 'Collection of property tax, water charges, and other local taxes for village development.')
    }
  ];

  const schemes = [
    {
      id: 1,
      title: t('services.govSchemes.pmKisan.title', 'PM Kisan Samman Nidhi'),
      description: t('services.govSchemes.pmKisan.description', 'Direct income support of ₹6,000 per year to farmer families'),
      eligibility: t('services.govSchemes.pmKisan.eligibility', 'All small and marginal farmers with cultivable land'),
      documents: t('services.govSchemes.pmKisan.documents', 'Aadhaar Card, Land Records, Bank Account details')
    },
    {
      id: 2,
      title: t('services.govSchemes.pmay.title', 'Pradhan Mantri Awas Yojana - Gramin'),
      description: t('services.govSchemes.pmay.description', 'Financial assistance for construction of pucca houses'),
      eligibility: t('services.govSchemes.pmay.eligibility', 'Houseless families and those with kutcha/dilapidated houses'),
      documents: t('services.govSchemes.pmay.documents', 'Aadhaar Card, Income Certificate, Land documents')
    },
    {
      id: 3,
      title: t('services.govSchemes.ayushman.title', 'Ayushman Bharat'),
      description: t('services.govSchemes.ayushman.description', 'Health insurance cover of ₹5 lakh per family per year'),
      eligibility: t('services.govSchemes.ayushman.eligibility', 'Families identified through SECC database'),
      documents: t('services.govSchemes.ayushman.documents', 'Aadhaar Card, Ration Card')
    },
    {
      id: 4,
      title: t('services.govSchemes.mgnrega.title', 'MGNREGA'),
      description: t('services.govSchemes.mgnrega.description', 'Guarantee of 100 days of wage employment in a financial year'),
      eligibility: t('services.govSchemes.mgnrega.eligibility', 'Adult members of rural households willing to do unskilled manual work'),
      documents: t('services.govSchemes.mgnrega.documents', 'Job Card, Aadhaar Card, Bank Account details')
    }
  ];

  return (
    <div className="services-page">
      <HeroSection 
        title={t('services.title', 'Our Services')} 
        subtitle={t('services.subtitle', 'Comprehensive services and schemes for the welfare of our residents')}
        backgroundImage="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&fit=crop&w=1200&q=80"
      />

      <section className="services-list-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.offeredTitle', 'Services Offered')}</h2>
            <p>{t('services.offeredSubtitle', 'The Gram Panchayat is dedicated to providing efficient services to all residents')}</p>
          </div>
          
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard 
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="service-process-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.process.title', 'How to Avail Services')}</h2>
            <p>{t('services.process.subtitle', 'Simple process to access Gram Panchayat services')}</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step1.title', 'Submit Application')}</h3>
                <p>{t('services.process.steps.step1.desc', 'Visit the Panchayat office or use our online portal to submit your application along with required documents.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step2.title', 'Verification')}</h3>
                <p>{t('services.process.steps.step2.desc', 'Our team will verify your application and documents as per the service requirements.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step3.title', 'Processing')}</h3>
                <p>{t('services.process.steps.step3.desc', 'Your request will be processed within the stipulated timeframe as per service norms.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step4.title', 'Service Delivery')}</h3>
                <p>{t('services.process.steps.step4.desc', 'Once approved, collect your certificate/document or avail the service as applicable.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="schemes-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.govSchemes.title', 'Government Schemes')}</h2>
            <p>{t('services.govSchemes.subtitle', 'Information about various welfare schemes available for eligible residents')}</p>
          </div>
          
          <div className="schemes-list">
            {schemes.map(scheme => (
              <div key={scheme.id} className="scheme-card">
                <h3>{scheme.title}</h3>
                <p className="scheme-description">{scheme.description}</p>
                <div className="scheme-details">
                  <div className="scheme-detail">
                    <h4>{t('services.govSchemes.eligibility', 'Eligibility:')}</h4>
                    <p>{scheme.eligibility}</p>
                  </div>
                  <div className="scheme-detail">
                    <h4>{t('services.govSchemes.documents', 'Required Documents:')}</h4>
                    <p>{scheme.documents}</p>
                  </div>
                </div>
                <button className="scheme-btn">{t('services.govSchemes.applyNow', 'Apply Now')}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-hours-section">
        <div className="container">
          <div className="service-hours-content">
            <div className="service-hours-text">
              <h2>{t('services.officeHours.title', 'Panchayat Office Hours')}</h2>
              <div className="office-hours">
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.regular', 'Monday - Saturday:')}</span>
                  <span className="time">{t('services.officeHours.time', '10:00 AM - 5:00 PM')}</span>
                </div>
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.lunch', 'Lunch Break:')}</span>
                  <span className="time">{t('services.officeHours.lunchTime', '1:00 PM - 2:00 PM')}</span>
                </div>
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.holidays', 'Sunday & Public Holidays:')}</span>
                  <span className="time">{t('services.officeHours.closed', 'Closed')}</span>
                </div>
              </div>
              <p className="note">
                {t('services.officeHours.note.certificates', '* Certificate services are available from 10:00 AM to 1:00 PM only.')}<br />
                {t('services.officeHours.note.sarpanch', '* Sarpanch meeting hours: Wednesday & Friday, 3:00 PM - 5:00 PM')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;