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
        title={currentPage === 'visualizer' ? 'Engineer Lab' : undefined}
        subtitle={
          currentPage === 'visualizer'
            ? 'Interactive visualization of engineering concepts'
            : undefined
        }
      />
      <main className='main-content'>
        {currentPage === 'home' ? <Home /> : children}
      </main>
    </div>
  )
}
