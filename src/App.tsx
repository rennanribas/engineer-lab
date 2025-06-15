import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { LoadSpinner } from './components/common'

// Main App Layout Component following Container/Presentational pattern
export default function App() {
  return (
    <div className='min-h-screen flex flex-col bg-bg-primary'>
      <Header />
      <main className='flex-1 pt-16'>
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
