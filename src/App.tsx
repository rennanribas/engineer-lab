import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Layout/Header'

// Main App Layout Component following Container/Presentational pattern
export default function App() {
  return (
    <div className='min-h-screen flex flex-col bg-bg-primary'>
      <Header />
      <main className='flex-1'>
        <Suspense 
          fallback={
            <div className='flex items-center justify-center h-64 text-text-secondary'>
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
