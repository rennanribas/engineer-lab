import { Header } from './Header'
import { Home } from '../Home/Home'
import { useNavigation } from '../../contexts/useNavigation'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { currentPage } = useNavigation()

  return (
    <div className='layout'>
      <Header
        title={
          currentPage === 'visualizer'
            ? 'Engineer Lab'
            : currentPage === 'eventloop'
            ? 'Event Loop Visualizer'
            : undefined
        }
        subtitle={
          currentPage === 'visualizer'
            ? 'Interactive visualization of engineering concepts'
            : currentPage === 'eventloop'
            ? 'Understanding JavaScript Event Loop through visual animations'
            : undefined
        }
      />
      <main className='main-content'>
        {currentPage === 'home' ? <Home /> : children}
      </main>
    </div>
  )
}
