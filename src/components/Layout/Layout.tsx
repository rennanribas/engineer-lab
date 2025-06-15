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
      <Header />
      <main className='main-content'>
        {currentPage === 'home' ? <Home /> : children}
      </main>
    </div>
  )
}
