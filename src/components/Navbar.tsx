import { useState, useEffect } from 'react';
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: adminUsername,
          password: adminPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store the JWT token
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('adminToken', data.token);
          window.localStorage.setItem('isAdmin', 'true');
        }
        setShowLogin(false);
        setAdminUsername('');
        setAdminPassword('');
        setLoginError('');
        // Refresh the page to update admin state
        window.location.reload();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('adminToken');
      window.localStorage.removeItem('isAdmin');
      window.location.reload();
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

          <div 
            className="navbar-title" 
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              fontSize: '2.8rem', 
              fontWeight: 'bold', 
              color: isScrolled ? '#222' : '#fff', 
              letterSpacing: '2px', 
              userSelect: 'none',
              transition: 'color 0.5s, text-shadow 0.5s',
              textShadow: isScrolled 
                ? '0 2px 12px rgba(0,0,0,0.08), 0 1px 0 #fff, 0 0 16px #007bff' 
                : '0 4px 24px rgba(0,0,0,0.25), 0 1px 0 #007bff, 0 0 24px #fff',
              transform: isScrolled ? 'rotateY(8deg) scale(1.04)' : 'rotateY(0deg) scale(1)',
              perspective: '400px',
              willChange: 'color, text-shadow, transform'
            }}
          >
            {t('nav.brandTitle', 'Apli Janori')}
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
                <button
                  className={`nav-link admin-btn${isScrolled ? ' scrolled' : ''}`}
                  onClick={() => setShowLogin(true)}
                >
                  <User size={18} className="admin-btn-icon" />
                  {t('nav.adminLogin', 'Admin Login')}
                </button>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <button
                  className={`nav-link${isScrolled ? ' scrolled' : ''}`}
                  style={{background:'none',border:'none',fontSize:'1rem',cursor:'pointer',marginLeft:16,display:'flex',alignItems:'center',gap:4,transition:'color 0.4s'}}
                  onClick={handleLogout}
                >
                  {t('nav.logout', 'Logout')}
                </button>
              </li>
            )}
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
          </ul>
          {showLogin && (
            <div className="admin-login-modal-bg">
              <form className="admin-login-card" onSubmit={handleLogin}>
                <h2 className="admin-login-title">login</h2>
                <label className="admin-login-label">
                  Username
                  <input
                    type="text"
                    className="admin-login-input"
                    value={adminUsername}
                    onChange={e => setAdminUsername(e.target.value)}
                  />
                </label>
                <label className="admin-login-label">
                  Password
                  <input
                    type="password"
                    className="admin-login-input"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                </label>
                <div className="admin-login-options">
                  <label>
                    <input type="checkbox" style={{marginRight:4}} /> <span style={{color:'#2196f3'}}>Remember me</span>
                  </label>
                </div>
                {loginError && <div style={{color:'#e53935',textAlign:'center'}}>{loginError}</div>}
                <button type="submit" className="admin-login-btn">Login</button>
                <button type="button" className="admin-login-cancel" onClick={() => setShowLogin(false)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;