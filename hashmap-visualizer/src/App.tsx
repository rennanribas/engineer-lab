import { NavigationProvider } from './contexts/NavigationContext'
import { Layout } from './components/Layout/Layout'
import { DemoContainer } from './components/Demo/DemoContainer'
import './App.css'

function App() {
  return (
    <NavigationProvider>
      <Layout>
        <DemoContainer />
      </Layout>
    </NavigationProvider>
  )
}

export default App
