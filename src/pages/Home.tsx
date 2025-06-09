import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Award, Home as HomeIcon, Users, Phone, Ambulance, Stethoscope, PhoneCall } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import ServiceCard from '../components/ServiceCard';
import '../styles/Home.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://media.istockphoto.com/id/503160722/photo/farmer-spreads-fertilizers-in-the-field-wheat.jpg?s=612x612&w=0&k=20&c=H616JmwTXkV8LVsiriMyqx2M9W_LUHbMwKiHEsehz-E=",
      title: t('home.slide1.title', 'Welcome to ShreeRampur'),
      subtitle: t('home.slide1.subtitle', 'A model village committed to sustainable development and prosperity')
    },
    {
      image: "https://media.istockphoto.com/id/1157249891/photo/shantiniketan-bolpur-india-annual-fair-in-evening.jpg?s=612x612&w=0&k=20&c=dHCev7ph_doyr0hoAEBNGDyGsqRD9eLpcsff1p7i3J8=",
      title: t('home.slide2.title', 'Clean Village, Beautiful Village'),
      subtitle: t('home.slide2.subtitle', 'Our pride, our responsibility')
    },
    {
      image: "https://media.istockphoto.com/id/1060740880/photo/aerial-view-of-poor-indian-town-varsana-barsana-high-resolution-panorama-for-large-format.jpg?s=612x612&w=0&k=20&c=eFZ2CF0oUgcF23IVcsDCw9QGr6q2a6d22_4nTSJKn4c=",
      title: t('home.slide3.title', 'Journey of Development'),
      subtitle: t('home.slide3.subtitle', 'A step towards progress')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const panchayatMembers = [
    {
      id: 1,
      name: 'सौ. लता धोंडीराम घुगे',
      position: 'सरपंच',
      category: 'ना.मा.प्र.',
      image: "./public/members/member1.jpg"
    },
    {
      id: 2,
      name: 'श्री. नवकिशोर गणेश गवडे',
      position: 'उपसरपंच',
      category: 'सर्वसाधारण',
      image: "./public/members/member1.jpg"
    },
    {
      id: 3,
      name: 'श्री. रमेश जयराम डोंगे',
      position: 'सदस्य',
      category: 'अ.जा.',
      image: "./public/members/member1.jpg"
    },
    {
      id: 4,
      name: 'श्री. शंकर रामदास सोनक्के',
      position: 'सदस्य',
      category: 'अ.जा.',
      image: "./public/members/member1.jpg"
    },
    {
      id: 5,
      name: 'सौ. दिशा गजानन भजन',
      position: 'सदस्या',
      category: 'स.सा.स्त्री',
      image: "./public/members/member1.jpg"
    },
    {
      id: 6,
      name: 'सौ. सुरेखा सुधाकर घुगे',
      position: 'सदस्या',
      category: 'स.सा.स्त्री',
      image: "./public/members/member1.jpg"
    },
    {
      id: 7,
      name: 'सौ. दुर्गा प्रभाकर बोरसे',
      position: 'सदस्या',
      category: 'स.सा.स्त्री',
      image: "./public/members/member1.jpg"
    },
    {
      id: 8,
      name: 'सौ. अर्चना मंगेश टाले',
      position: 'सदस्या',
      category: 'ना.मा.प्र.',
      image: "./public/members/member1.jpg"
    },
    {
      id: 9,
      name: 'शेख रेहाना शेख मोहम्मद',
      position: 'सदस्या',
      category: 'अ.मु.स्त्री',
      image: "./public/members/member1.jpg"
    },
    {
      id: 10,
      name: 'श्री. व्ही. के. बाजाले',
      position: 'सचिव',
      category: 'कर्मचारी',
      image: "./public/members/member1.jpg"
    },
    {
      id: 11,
      name: 'श्री. सुरेश रामचंद्र चितोडे',
      position: 'कर्मचारी',
      category: 'कर्मचारी',
      image: "./public/members/member1.jpg"
    },
    {
      id: 12,
      name: 'श्री. अंबादास खंडबा डोंगे',
      position: 'परिचालक',
      category: 'परिचालक',
      image: "./public/members/member1.jpg"
    }
  ];

  const recentEvents = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8849294/pexels-photo-8849294.jpeg',
      title: 'Blood Donation Camp',
      date: 'May 15, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Village Community Hall',
      description: 'Join us for the annual blood donation camp organized in association with District Hospital.'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
      title: 'Farmers Training Program',
      date: 'June 2, 2025',
      time: '10:00 AM - 1:00 PM',
      location: 'Agricultural Extension Center',
      description: 'Learn about modern farming techniques and government schemes for farmers.'
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <section className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2>{t('home.welcomeTitle', 'Welcome to ')}<span>{t('home.villageName', 'ShreeRampur')}</span>{t('home.gramPanchayat', ' Gram Panchayat')}</h2>
              <p>{t('home.welcomeParagraph1', 'ShreeRampur is a vibrant village located in the heart of rural Maharashtra, where tradition meets progress. Our Gram Panchayat is committed to the sustainable development of our village and the welfare of our residents.')}</p>
              <p>{t('home.welcomeParagraph2', 'Under the visionary leadership of our Sarpanch and dedicated Panchayat members, we are working tirelessly to transform ShreeRampur into a model village with modern amenities while preserving our rich cultural heritage.')}</p>
              <Link to="/about" className="btn-primary">{t('home.learnMore', 'Learn More About Us')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="members-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.membersTitle', 'आमची ग्रामपंचायत सदस्य')}</h2>
            <p>{t('home.membersSubtitle', 'गावाच्या विकासासाठी समर्पित नेतृत्व')}</p>
          </div>
          
          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>अ.क्र.</th>
                  <th>छायाचित्र</th>
                  <th>नाव</th>
                  <th>पद</th>
                  <th>प्रवर्ग</th>
                </tr>
              </thead>
              <tbody>
                {panchayatMembers.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="member-image-container">
                        <img src={member.image} alt={member.name} className="member-image" />
                      </div>
                    </td>
                    <td>{member.name}</td>
                    <td>{member.position}</td>
                    <td>{member.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="emergency-services">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.emergencyTitle', 'Emergency Services')}</h2>
            <p>{t('home.emergencySubtitle', '24/7 Emergency assistance for our village residents')}</p>
          </div>
          
          <div className="emergency-grid">
            <div className="emergency-card">
              <div className="emergency-icon">
                <Ambulance size={32} />
              </div>
              <h3 className="emergency-title">{t('home.ambulanceTitle', 'Ambulance Service')}</h3>
              <p className="emergency-contact">{t('home.ambulanceContact', 'Contact: 108')}</p>
              <p className="emergency-contact">{t('home.ambulanceAlternate', 'Alternate: +91 98765 43210')}</p>
              <p className="emergency-details">{t('home.ambulanceDetails', '24/7 ambulance service with advanced life support')}</p>
            </div>

            <div className="emergency-card">
              <div className="emergency-icon">
                <Stethoscope size={32} />
              </div>
              <h3 className="emergency-title">{t('home.medicalTitle', 'Medical Emergency')}</h3>
              <p className="emergency-contact">{t('home.medicalContact1', 'Dr. Patil: +91 98765 12345')}</p>
              <p className="emergency-contact">{t('home.medicalContact2', 'Primary Health Center: 02135-123456')}</p>
              <p className="emergency-details">{t('home.medicalDetails', 'Available for emergency medical consultations')}</p>
            </div>

            <div className="emergency-card">
              <div className="emergency-icon">
                <PhoneCall size={32} />
              </div>
              <h3 className="emergency-title">{t('home.policeTitle', 'Police Station')}</h3>
              <p className="emergency-contact">{t('home.policeContact1', 'Emergency: 100')}</p>
              <p className="emergency-contact">{t('home.policeContact2', 'Police Station: 02135-234567')}</p>
              <p className="emergency-details">{t('home.policeDetails', '24/7 police assistance and emergency response')}</p>
            </div>

            <div className="emergency-card">
              <div className="emergency-icon">
                <Phone size={32} />
              </div>
              <h3 className="emergency-title">{t('home.fireTitle', 'Fire Emergency')}</h3>
              <p className="emergency-contact">{t('home.fireContact1', 'Fire Brigade: 101')}</p>
              <p className="emergency-contact">{t('home.fireContact2', 'Control Room: 02135-345678')}</p>
              <p className="emergency-details">{t('home.fireDetails', 'Quick response fire emergency services')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.eventsTitle', 'Upcoming Events')}</h2>
            <p>{t('home.eventsSubtitle', 'Stay updated with the latest happenings in our village')}</p>
          </div>
          
          <div className="events-container">
            {recentEvents.map(event => (
              <EventCard 
                key={event.id}
                image={event.image}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
              />
            ))}
          </div>
          
          <div className="events-btn-container">
            <Link to="/events" className="btn-secondary">{t('home.viewAllEvents', 'View All Events')}</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.ctaTitle', 'Have Questions or Suggestions?')}</h2>
            <p>{t('home.ctaSubtitle', "We're here to serve you. Reach out to us with your queries or feedback.")}</p>
            <Link to="/contact" className="btn-primary">{t('home.contactUs', 'Contact Us')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;