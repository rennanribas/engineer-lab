import { useState, type ReactNode } from 'react'
import type { NavigationState } from '../types/navigation'
import { NavigationContext } from './NavigationContextProvider'

interface NavigationProviderProps {
  children: ReactNode
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<NavigationState>('home')

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  )
}

// Export default to satisfy React Fast Refresh
export default NavigationProvider
