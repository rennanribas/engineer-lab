import { useState } from 'react'
import { useNavigation } from '../../contexts/useNavigation'
import type { NavigationItem } from '../../types/navigation'

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'visualizer', label: 'Data Structures', path: '/visualizer' },
  { id: 'eventloop', label: 'Event Loop', path: '/eventloop' },
]

export const Navigation = () => {
  const { currentPage, setCurrentPage } = useNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigation = (page: 'home' | 'visualizer' | 'eventloop') => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className='navigation'>
      <div className='nav-container'>
        <div className='nav-brand'>
          <button
            onClick={() => handleNavigation('home')}
            className='brand-button'
            aria-label='Go to home'
          >
            <span className='brand-text'>Engineer Lab</span>
          </button>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'nav-menu--open' : ''}`}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                handleNavigation(item.id as 'home' | 'visualizer' | 'eventloop')
              }
              className={`nav-item ${
                currentPage === item.id ? 'nav-item--active' : ''
              }`}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleMobileMenu}
          className='mobile-menu-toggle'
          aria-label='Toggle navigation menu'
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`hamburger ${isMobileMenuOpen ? 'hamburger--open' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  )
}
