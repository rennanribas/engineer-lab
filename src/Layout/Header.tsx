import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

// Navigation items configuration - following data-driven approach
const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/data-structures', label: 'Data Structures' },
  { to: '/eventloop', label: 'Event Loop' },
] as const

// Brand component - using CSS design tokens
function Brand() {
  return (
    <div className='nav-brand'>
      <Link to='/' className='brand-button'>
        <span className='brand-text'>Engineer Lab</span>
      </Link>
    </div>
  )
}

// Mobile menu button component
interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className='mobile-menu-toggle'
      aria-label='Toggle navigation menu'
      aria-expanded={isOpen}
    >
      <span className={`hamburger ${isOpen ? 'hamburger--open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  )
}

// Navigation link component - using CSS design tokens
interface NavLinkProps {
  to: string
  children: React.ReactNode
  mobile?: boolean
  onClick?: () => void
}

function NavLink({ to, children, onClick }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
    >
      {children}
    </Link>
  )
}

// Mobile navigation component
interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
}

function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  return (
    <div className={`nav-menu ${isOpen ? 'nav-menu--open' : ''}`}>
      {navigationItems.map(({ to, label }) => (
        <NavLink key={to} to={to} onClick={onClose}>
          {label}
        </NavLink>
      ))}
    </div>
  )
}

// Header container component - using CSS design tokens
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className='navigation'>
      <div className='nav-container'>
        {/* Brand */}
        <Brand />

        {/* Navigation Menu */}
        <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        {/* Mobile Menu Button */}
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        />
      </div>
    </nav>
  )
}
