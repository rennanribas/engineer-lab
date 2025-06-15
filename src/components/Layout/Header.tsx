import { Link } from 'react-router-dom'
import { useState } from 'react'

// Navigation items configuration - following data-driven approach
const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/visualizer', label: 'Data Structures' },
  { to: '/eventloop', label: 'Event Loop' },
] as const

// Brand component - modern gradient design
function Brand() {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
        <span className="text-white font-bold text-sm">EL</span>
      </div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Engineer Lab
      </h1>
    </Link>
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
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
      </div>
    </button>
  )
}

// Navigation link component - enhanced with active state
interface NavLinkProps {
  to: string
  children: React.ReactNode
  mobile?: boolean
  onClick?: () => void
}

function NavLink({ to, children, mobile = false, onClick }: NavLinkProps) {
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  const desktopClasses = "px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50"
  const mobileClasses = "block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-500"
  
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  )
}

// Desktop navigation component
function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
      {navigationItems.map(({ to, label }) => (
        <NavLink key={to} to={to}>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

// Mobile navigation component
interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
}

function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  if (!isOpen) return null
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
      <nav className="py-2" role="navigation" aria-label="Mobile navigation">
        {navigationItems.map(({ to, label }) => (
          <NavLink key={to} to={to} mobile onClick={onClose}>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

// Header container component - modern responsive design
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Brand />
          </div>
          
          {/* Desktop Navigation */}
          <DesktopNavigation />
          
          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  )
}