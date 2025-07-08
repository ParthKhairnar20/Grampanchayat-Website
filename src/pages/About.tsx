import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import { Users, Award, Map } from 'lucide-react';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <HeroSection 
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&fit=crop&w=1200&q=80"
      />

      <section className="village-info-section">
        <div className="container">
          <div className="village-info-content">
            <div className="village-image">
              <img src="https://images.pexels.com/photos/4577372/pexels-photo-4577372.jpeg" alt="Janori Village View" />
            </div>
            <div className="village-text">
              <h2>{t('about.history.title')}</h2>
              <p>{t('about.history.p1')}</p>
              <p>{t('about.history.p2')}</p>
              <p>{t('about.history.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demographics-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.demographics.title')}</h2>
            <p>{t('about.demographics.subtitle')}</p>
          </div>
          
          <div className="demographics-content">
            <div className="demographic-item">
              <div className="demographic-icon">
                <Users size={48} />
              </div>
              <h3>{t('about.demographics.population.title')}</h3>
              <p>{t('about.demographics.population.total')}</p>
              <ul>
                <li>{t('about.demographics.population.male')}</li>
                <li>{t('about.demographics.population.female')}</li>
                <li>{t('about.demographics.population.children')}</li>
                <li>{t('about.demographics.population.youth')}</li>
                <li>{t('about.demographics.population.adults')}</li>
                <li>{t('about.demographics.population.seniors')}</li>
              </ul>
            </div>
            
            <div className="demographic-item">
              <div className="demographic-icon">
                <Award size={48} />
              </div>
              <h3>{t('about.demographics.education.title')}</h3>
              <p>{t('about.demographics.education.rate')}</p>
              <ul>
                <li>{t('about.demographics.education.primary')}</li>
                <li>{t('about.demographics.education.secondary')}</li>
                <li>{t('about.demographics.education.graduates')}</li>
                <li>{t('about.demographics.education.higher')}</li>
                <li>{t('about.demographics.education.technical')}</li>
              </ul>
            </div>
            
            <div className="demographic-item">
              <div className="demographic-icon">
                <Map size={48} />
              </div>
              <h3>{t('about.demographics.geography.title')}</h3>
              <p>{t('about.demographics.geography.area')}</p>
              <ul>
                <li>{t('about.demographics.geography.agricultural')}</li>
                <li>{t('about.demographics.geography.residential')}</li>
                <li>{t('about.demographics.geography.forest')}</li>
                <li>{t('about.demographics.geography.water')}</li>
                <li>{t('about.demographics.geography.distance')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.achievements.title', 'Village Achievements')}</h2>
            <p>{t('about.achievements.subtitle', 'Recognitions and milestones that make us proud')}</p>
          </div>
          <div className="achievements-timeline">
            {Object.entries(t('about.achievements.items', { returnObjects: true, defaultValue: {
              '2023': { title: 'State-level Clean Village Award', description: 'Recognized for exemplary waste management and sanitation practices.' },
              '2022': { title: '100% Digital Literacy', description: 'Achieved digital literacy for all residents between the ages of 14-60 years.' },
              '2021': { title: 'Water Conservation Model Village', description: 'Implemented innovative water harvesting and conservation techniques.' },
              '2020': { title: 'Open Defecation Free Status', description: 'Successfully achieved and maintained ODF status with 100% toilet coverage.' },
              '2018': { title: 'Solar Energy Adoption', description: 'First village in the district to adopt solar energy for street lighting and public facilities.' }
            }})).map(([year, achievement]: [string, any]) => (
              <div key={year} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{year}</h3>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;