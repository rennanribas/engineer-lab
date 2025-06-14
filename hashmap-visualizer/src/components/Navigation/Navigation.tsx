import { useState } from 'react';
import { useNavigation } from '../../contexts/useNavigation';
import type { NavigationItem } from '../../types/navigation';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'visualizer', label: 'Data Structures', path: '/visualizer' }
];

export const Navigation = () => {
  const { currentPage, setCurrentPage } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page: 'home' | 'visualizer') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <button 
            onClick={() => handleNavigation('home')}
            className="brand-button"
            aria-label="Go to home"
          >
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12h6M9 16h6M9 8h6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <span className="brand-text">Engineer Lab</span>
          </button>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'nav-menu--open' : ''}`}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id as 'home' | 'visualizer')}
              className={`nav-item ${currentPage === item.id ? 'nav-item--active' : ''}`}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  );
};