import React from 'react'
import { createRoot } from 'react-dom/client'
import { NavigationProvider } from './contexts/NavigationContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </React.StrictMode>
)
