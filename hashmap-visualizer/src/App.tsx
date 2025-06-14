import { useNavigation } from './contexts/useNavigation'
import { Layout } from './components/Layout/Layout'
import { DemoContainer } from './components/Demo/DemoContainer'
import { EventLoopContainer } from './components/EventLoop/EventLoopContainer'
import './App.css'

function App() {
  const { currentPage } = useNavigation()

  const renderContent = () => {
    switch (currentPage) {
      case 'visualizer':
        return <DemoContainer />
      case 'eventloop':
        return <EventLoopContainer />
      default:
        return null
    }
  }

  return (
    <Layout>{renderContent()}</Layout>
  )
}

export default App
