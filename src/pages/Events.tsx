import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import { Calendar, Search } from 'lucide-react';
import '../styles/Events.css';
import { useTranslation } from 'react-i18next';

const Events = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const events = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8849294/pexels-photo-8849294.jpeg',
      title: t('events.dynamicEvents.1.title', 'Blood Donation Camp'),
      date: t('events.dynamicEvents.1.date', 'May 15, 2025'),
      time: t('events.dynamicEvents.1.time', '9:00 AM - 4:00 PM'),
      location: t('events.dynamicEvents.1.location', 'Village Community Hall'),
      description: t('events.dynamicEvents.1.description', 'Join us for the annual blood donation camp organized in association with District Hospital.'),
      category: 'health'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
      title: t('events.dynamicEvents.2.title', 'Farmers Training Program'),
      date: t('events.dynamicEvents.2.date', 'June 2, 2025'),
      time: t('events.dynamicEvents.2.time', '10:00 AM - 1:00 PM'),
      location: t('events.dynamicEvents.2.location', 'Agricultural Extension Center'),
      description: t('events.dynamicEvents.2.description', 'Learn about modern farming techniques and government schemes for farmers.'),
      category: 'agriculture'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg',
      title: t('events.dynamicEvents.3.title', 'Village Cleanliness Drive'),
      date: t('events.dynamicEvents.3.date', 'June 10, 2025'),
      time: t('events.dynamicEvents.3.time', '7:00 AM - 11:00 AM'),
      location: t('events.dynamicEvents.3.location', 'Village Square'),
      description: t('events.dynamicEvents.3.description', 'Community initiative to clean our village and promote proper waste management practices.'),
      category: 'environment'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg',
      title: t('events.dynamicEvents.4.title', 'Women Empowerment Workshop'),
      date: t('events.dynamicEvents.4.date', 'June 18, 2025'),
      time: t('events.dynamicEvents.4.time', '11:00 AM - 2:00 PM'),
      location: t('events.dynamicEvents.4.location', 'Panchayat Meeting Hall'),
      description: t('events.dynamicEvents.4.description', 'Workshop focused on skill development and entrepreneurship opportunities for women.'),
      category: 'social'
    },
    {
      id: 5,
      image: 'https://media.istockphoto.com/id/486596345/photo/emergency-medical-camp-at-babughat-kolkata-india.jpg?s=2048x2048&w=is&k=20&c=1nZBZgaMQUHOfcNjpnHvdM9QEy3vhTONqkIZAMRSYtY=',
      title: t('events.dynamicEvents.5.title', 'Free Health Check-up Camp'),
      date: t('events.dynamicEvents.5.date', 'July 5, 2025'),
      time: t('events.dynamicEvents.5.time', '9:00 AM - 3:00 PM'),
      location: t('events.dynamicEvents.5.location', 'Primary Health Center'),
      description: t('events.dynamicEvents.5.description', 'Comprehensive health check-up including eye examination, blood pressure, and diabetes screening.'),
      category: 'health'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg',
      title: t('events.dynamicEvents.6.title', "Children's Day Celebration"),
      date: t('events.dynamicEvents.6.date', 'November 14, 2025'),
      time: t('events.dynamicEvents.6.time', '10:00 AM - 2:00 PM'),
      location: t('events.dynamicEvents.6.location', 'Village School Ground'),
      description: t('events.dynamicEvents.6.description', "Fun activities, games, and cultural programs for children on the occasion of Children's Day."),
      category: 'culture'
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1582493/pexels-photo-1582493.jpeg',
      title: t('events.dynamicEvents.7.title', 'Village Tree Plantation Drive'),
      date: t('events.dynamicEvents.7.date', 'August 20, 2025'),
      time: t('events.dynamicEvents.7.time', '8:00 AM - 12:00 PM'),
      location: t('events.dynamicEvents.7.location', 'Village Entrance Road'),
      description: t('events.dynamicEvents.7.description', 'Join us for a community tree plantation drive to make our village greener and healthier.'),
      category: 'environment'
    }
  ];

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const filteredEvents = events
    .filter(event => filterCategory === 'all' || event.category === filterCategory)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="events-page">
      <HeroSection 
        title={t('events.title', 'Village Events')} 
        subtitle={t('events.subtitle', 'Stay updated with all the activities happening in Janori')}
        backgroundImage="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=compress&fit=crop&w=1200&q=80"
      />

      <section className="events-list-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('events.upcomingEventsTitle', 'Upcoming Events')}</h2>
            <p>{t('events.upcomingEventsSubtitle', 'Be a part of our community gatherings and activities')}</p>
          </div>

          <div className="events-filter">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder={t('events.search', 'Search events...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filter">
              {categories.map((category, index) => (
                <button 
                  key={index} 
                  className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {t(`events.categories.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}
                </button>
              ))}
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map(event => (
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
          ) : (
            <div className="no-events">
              <Calendar size={48} />
              <h3>{t('events.noEventsTitle', 'No events found')}</h3>
              <p>{t('events.noEventsDescription', 'Try changing your search criteria or check back later for new events.')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="event-calendar-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('events.annualEventsTitle', 'Annual Village Events')}</h2>
            <p>{t('events.annualEventsSubtitle', 'Mark your calendars for these recurring annual events')}</p>
          </div>

          <div className="annual-events">
            <div className="annual-event">
              <div className="event-month">{t('events.annualEvents.january', 'January')}</div>
              <div className="event-info">
                <h3>{t('events.annualEvents.republicDay.title', 'Republic Day Celebration')}</h3>
                <p>{t('events.annualEvents.republicDay.date', 'January 26')} | {t('events.annualEvents.republicDay.location', 'Village Square')}</p>
              </div>
            </div>

            <div className="annual-event">
              <div className="event-month">{t('events.annualEvents.march', 'March')}</div>
              <div className="event-info">
                <h3>{t('events.annualEvents.holi.title', 'Holi Festival Gathering')}</h3>
                <p>{t('events.annualEvents.holi.date', 'March (as per calendar)')} | {t('events.annualEvents.holi.location', 'Community Ground')}</p>
              </div>
            </div>

            <div className="annual-event">
              <div className="event-month">{t('events.annualEvents.august', 'August')}</div>
              <div className="event-info">
                <h3>{t('events.annualEvents.independenceDay.title', 'Independence Day Celebration')}</h3>
                <p>{t('events.annualEvents.independenceDay.date', 'August 15')} | {t('events.annualEvents.independenceDay.location', 'School Ground')}</p>
              </div>
            </div>

            <div className="annual-event">
              <div className="event-month">{t('events.annualEvents.october', 'October')}</div>
              <div className="event-info">
                <h3>{t('events.annualEvents.sportsTournament.title', 'Village Sports Tournament')}</h3>
                <p>{t('events.annualEvents.sportsTournament.date', 'October 2-10')} | {t('events.annualEvents.sportsTournament.location', 'Sports Ground')}</p>
              </div>
            </div>

            <div className="annual-event">
              <div className="event-month">{t('events.annualEvents.octNov', 'October-November')}</div>
              <div className="event-info">
                <h3>{t('events.annualEvents.diwali.title', 'Diwali Community Celebration')}</h3>
                <p>{t('events.annualEvents.diwali.date', 'As per calendar')} | {t('events.annualEvents.diwali.location', 'Village Center')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="event-proposal-section">
        <div className="container">
          <div className="proposal-content">
            <div className="proposal-text">
              <h2>{t('events.proposeTitle', 'Have an Event Idea?')}</h2>
              <p>{t('events.proposeDescription', 'We welcome community-driven events and initiatives. If you have an idea for an event that can benefit our village, please share it with us.')}</p>
              <button className="btn-primary">{t('events.proposeButton', 'Propose an Event')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;