import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/Navbar.css';
import janoriLogo from '../Aaplijanori_20250126_141653_0000.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded check for demonstration
    if (adminUsername === 'admin' && adminPassword === '12345') {
      setShowLogin(false);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isAdmin', 'true');
        // Instead of reload, just update state so Upload button does not show
        setAdminUsername('');
        setAdminPassword('');
        setLoginError('');
      }
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Check admin status from localStorage
  const isAdmin = typeof window !== 'undefined' && window.localStorage.getItem('isAdmin') === 'true';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src={janoriLogo} alt="Logo" className="navbar-svg-logo" style={{ height: '80px', width: '80px', objectFit: 'contain' }} />
          </Link>

          <div className="navbar-title" style={{ flex: 1, textAlign: 'center', fontSize: '2.8rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px', userSelect: 'none' }}>
            Apli Janori
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className={`nav-item ${isActive('/')}`}>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                {t('nav.home')}
              </Link>
            </li>
            <li className={`nav-item ${isActive('/about')}`}>
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                {t('nav.about')}
              </Link>
            </li>
            <li className={`nav-item ${isActive('/services')}`}>
              <Link to="/services" className="nav-link" onClick={closeMenu}>
                {t('nav.services')}
              </Link>
            </li>
            <li className={`nav-item ${isActive('/events')}`}>
              <Link to="/events" className="nav-link" onClick={closeMenu}>
                {t('nav.events')}
              </Link>
            </li>
            <li className={`nav-item ${isActive('/gallery')}`}>
              <Link to="/gallery" className="nav-link" onClick={closeMenu}>
                {t('nav.gallery')}
              </Link>
            </li>
            <li className={`nav-item ${isActive('/contact')}`}>
              <Link to="/contact" className="nav-link" onClick={closeMenu}>
                {t('nav.contact')}
              </Link>
            </li>
            {/* Always show Admin Login if not logged in as admin */}
            {!isAdmin && (
              <li className="nav-item">
                <button className={`nav-link${isScrolled ? ' scrolled' : ''}`} style={{background:'none',border:'none',color:'inherit',fontSize:'1rem',cursor:'pointer',marginLeft:0,display:'flex',alignItems:'center',gap:4,transition:'color 0.4s'}} onClick={() => setShowLogin(true)}>
                  <User size={18} style={{marginRight: 4, color: 'inherit', transition: 'color 0.4s'}} />
                  Admin Login
                </button>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <button className="nav-link" style={{background:'none',border:'none',color:'#fff',fontSize:'1rem',cursor:'pointer',marginLeft:16}} onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('isAdmin');
                    window.location.reload();
                  }
                }}>
                  Logout
                </button>
              </li>
            )}
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
          </ul>
          {showLogin && (
            <div className="admin-login-modal" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000}}>
              <form onSubmit={handleLogin} style={{background:'#fff',padding:32,borderRadius:8,minWidth:320,boxShadow:'0 2px 16px rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',gap:16}}>
                <h2 style={{margin:0}}>Admin Login</h2>
                <input type="text" placeholder="Username" value={adminUsername} onChange={e => setAdminUsername(e.target.value)} style={{padding:8,fontSize:16}} />
                <input type="password" placeholder="Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} style={{padding:8,fontSize:16}} />
                {loginError && <div style={{color:'red'}}>{loginError}</div>}
                <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                  <button type="button" onClick={() => setShowLogin(false)} style={{padding:'8px 16px'}}>Cancel</button>
                  <button type="submit" style={{padding:'8px 16px',background:'#007bff',color:'#fff',border:'none',borderRadius:4}}>Login</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;