import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy load components for better performance - React 19 pattern
const Home = lazy(() =>
  import('./pages/Home').then((module) => ({
    default: module.Home,
  }))
)

const DataStructures = lazy(() =>
  import('./pages/DataStructures').then((module) => ({
    default: module.DataStructures,
  }))
)

const EventLoop = lazy(() =>
  import('./pages/EventLoop').then((module) => ({
    default: module.EventLoop,
  }))
)

// Route configuration following modern patterns
export const routeConfig: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'data-structures',
    element: <DataStructures />,
  },
  {
    path: 'eventloop',
    element: <EventLoop />,
  },
]
