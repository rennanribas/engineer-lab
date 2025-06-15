import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Layout/Header'
import { LoadSpinner } from './components/common'

// Main App Layout Component following Container/Presentational pattern
export default function App() {
  return (
    <div className='layout'>
      <Header />
      <main className='main-content'>
        <Suspense
          fallback={
            <div className='flex items-center justify-center h-64'>
              <LoadSpinner size='lg' variant='primary' />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
