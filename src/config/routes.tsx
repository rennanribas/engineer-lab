import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy load components for better performance - React 19 pattern
const Home = lazy(() => 
  import('../components/Home/Home').then(module => ({ default: module.Home }))
)

const DataStructuresContainer = lazy(() => 
  import('../components/Demo/DataStructuresContainer').then(module => ({ 
    default: module.DataStructuresContainer 
  }))
)

const EventLoopContainer = lazy(() => 
  import('../components/EventLoop/EventLoopContainer').then(module => ({ 
    default: module.EventLoopContainer 
  }))
)

// Route configuration following modern patterns
export const routeConfig: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'visualizer',
    element: <DataStructuresContainer />,
  },
  {
    path: 'eventloop',
    element: <EventLoopContainer />,
  },
]