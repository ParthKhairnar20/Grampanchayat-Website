import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import { Calendar, Search } from 'lucide-react';
import '../styles/Events.css';
import { useTranslation } from 'react-i18next';

const Events = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: ''
  });
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposal, setProposal] = useState({
    name: '',
    email: '',
    title: '',
    date: '',
    description: ''
  });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Check admin status from localStorage
  const isAdmin = typeof window !== 'undefined' && window.localStorage.getItem('isAdmin') === 'true';

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

  const [eventList, setEventList] = useState(events);

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const filteredEvents = events
    .filter(event => filterCategory === 'all' || event.category === filterCategory)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Proposal storage for admin view
  const [proposals, setProposals] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('eventProposals');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

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
          {isAdmin && (
            <div style={{marginBottom: '1.5rem', textAlign: 'right'}}>
              <button className="btn-primary" onClick={() => setShowEventForm(true)}>
                {t('events.uploadEvent', 'Upload Event')}
              </button>
            </div>
          )}

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

          {showEventForm && (
            <div className="event-upload-modal" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000}}>
              <form onSubmit={e => {
                e.preventDefault();
                setEventList(prev => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    ...newEvent
                  }
                ]);
                setShowEventForm(false);
                setNewEvent({ title: '', date: '', time: '', location: '', description: '', image: '', category: '' });
              }} style={{background:'#fff',padding:32,borderRadius:8,minWidth:320,maxWidth:400,boxShadow:'0 2px 16px rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',gap:12}}>
                <h2 style={{margin:0}}>Upload Event</h2>
                <input type="text" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent(ev => ({...ev, title: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <input type="date" placeholder="Date" value={newEvent.date} onChange={e => setNewEvent(ev => ({...ev, date: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <input type="text" placeholder="Time" value={newEvent.time} onChange={e => setNewEvent(ev => ({...ev, time: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <input type="text" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent(ev => ({...ev, location: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <input type="text" placeholder="Image URL" value={newEvent.image} onChange={e => setNewEvent(ev => ({...ev, image: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <input type="text" placeholder="Category" value={newEvent.category} onChange={e => setNewEvent(ev => ({...ev, category: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <textarea placeholder="Description" value={newEvent.description} onChange={e => setNewEvent(ev => ({...ev, description: e.target.value}))} required style={{padding:8,fontSize:16}} />
                <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                  <button type="button" onClick={() => setShowEventForm(false)} style={{padding:'8px 16px'}}>Cancel</button>
                  <button type="submit" style={{padding:'8px 16px',background:'#007bff',color:'#fff',border:'none',borderRadius:4}}>Add Event</button>
                </div>
              </form>
            </div>
          )}

          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {eventList.filter(event =>
                (filterCategory === 'all' || event.category === filterCategory) &&
                (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  event.location.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ).map(event => (
                <div key={event.id} style={{ position: 'relative' }}>
                  <EventCard 
                    image={event.image}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                  />
                  {isAdmin && (
                    <button
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#ff4e50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '4px 10px',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      onClick={() => setEventList(prev => prev.filter(e => e.id !== event.id))}
                    >
                      Delete
                    </button>
                  )}
                </div>
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
              <button className="btn-primary" onClick={() => setShowProposalForm(true)}>{t('events.proposeButton', 'Propose an Event')}</button>
            </div>
          </div>
          {isAdmin && proposals.length > 0 && (
            <div style={{margin:'40px auto 0',maxWidth:600,background:'#fff',borderRadius:12,boxShadow:'0 2px 12px rgba(0,0,0,0.08)',padding:24}}>
              <h3 style={{color:'#007bff',marginBottom:16}}>Proposed Events</h3>
              <ul style={{listStyle:'none',padding:0,margin:0}}>
                {proposals.map((p: { name: string; email: string; title: string; date: string; description: string }, idx: number) => (
                  <li key={idx} style={{borderBottom:'1px solid #eee',padding:'12px 0'}}>
                    <div style={{fontWeight:600}}>{p.title} <span style={{fontWeight:400,color:'#888',fontSize:13}}>({p.date})</span></div>
                    <div style={{color:'#555',fontSize:15,margin:'4px 0 2px 0'}}>{p.description}</div>
                    <div style={{fontSize:13,color:'#888'}}>By: {p.name} ({p.email})</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {showProposalForm && (
          <div className="proposal-modal" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,animation:'fadeInBg 0.4s'}}>
            <form onSubmit={e => {
              e.preventDefault();
              setProposalSubmitted(true);
              setProposals((prev: typeof proposals) => {
                const updated = [...prev, proposal];
                if (typeof window !== 'undefined') {
                  window.localStorage.setItem('eventProposals', JSON.stringify(updated));
                }
                return updated;
              });
              setTimeout(() => {
                setShowProposalForm(false);
                setProposalSubmitted(false);
                setProposal({ name: '', email: '', title: '', date: '', description: '' });
              }, 2000);
            }} 
            style={{
              background:'#fff',
              padding:'32px 32px 24px 32px',
              borderRadius:16,
              minWidth:340,
              maxWidth:420,
              boxShadow:'0 8px 32px rgba(0,0,0,0.18)',
              display:'flex',
              flexDirection:'column',
              gap:18,
              animation:'slideInModal 0.4s'
            }}>
              <h2 style={{margin:0, textAlign:'center', color:'#007bff', letterSpacing:1}}>Propose an Event</h2>
              {proposalSubmitted ? (
                <div style={{color:'green',fontWeight:600,fontSize:18,padding:'24px 0',textAlign:'center',animation:'fadeInMsg 0.5s'}}>Thank you for your suggestion!</div>
              ) : (
                <>
                  <div style={{display:'flex',gap:12}}>
                    <input type="text" placeholder="Your Name" value={proposal.name} onChange={e => setProposal(p => ({...p, name: e.target.value}))} required style={{padding:10,fontSize:16,borderRadius:6,border:'1px solid #ccc',flex:1}} />
                    <input type="email" placeholder="Your Email" value={proposal.email} onChange={e => setProposal(p => ({...p, email: e.target.value}))} required style={{padding:10,fontSize:16,borderRadius:6,border:'1px solid #ccc',flex:1}} />
                  </div>
                  <input type="text" placeholder="Event Title" value={proposal.title} onChange={e => setProposal(p => ({...p, title: e.target.value}))} required style={{padding:10,fontSize:16,borderRadius:6,border:'1px solid #ccc'}} />
                  <input type="date" placeholder="Event Date" value={proposal.date} onChange={e => setProposal(p => ({...p, date: e.target.value}))} required style={{padding:10,fontSize:16,borderRadius:6,border:'1px solid #ccc'}} />
                  <textarea placeholder="Event Description" value={proposal.description} onChange={e => setProposal(p => ({...p, description: e.target.value}))} required style={{padding:10,fontSize:16,borderRadius:6,border:'1px solid #ccc',minHeight:80}} />
                  <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:8}}>
                    <button type="button" onClick={() => setShowProposalForm(false)} style={{padding:'8px 18px',background:'#eee',color:'#333',border:'none',borderRadius:6,fontWeight:500}}>Cancel</button>
                    <button type="submit" style={{padding:'8px 18px',background:'#007bff',color:'#fff',border:'none',borderRadius:6,fontWeight:600,boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>Submit</button>
                  </div>
                </>
              )}
            </form>
            <style>{`
              @keyframes slideInModal {
                from { transform: translateY(-40px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
              @keyframes fadeInBg {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes fadeInMsg {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;