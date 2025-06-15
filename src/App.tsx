import { useNavigation } from './contexts/useNavigation'
import { Layout } from './components/Layout/Layout'
import { DataStructuresContainer } from './components/Demo/DataStructuresContainer'
import { EventLoopContainer } from './components/EventLoop/EventLoopContainer'
import './App.css'

function App() {
  const { currentPage } = useNavigation()

  const renderContent = () => {
    switch (currentPage) {
      case 'visualizer':
        return <DataStructuresContainer />
      case 'eventloop':
        return <EventLoopContainer />
      default:
        return null
    }
  }

  return <Layout>{renderContent()}</Layout>
}

export default App
