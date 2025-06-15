import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/common'
import { routeConfig } from './config/routes'
import './index.css'
import './App.css'

// Router configuration following modern patterns
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: routeConfig,
  },
])

// Root element with proper error handling
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.')
}

// Modern React 19 rendering with enhanced error boundaries
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
)
