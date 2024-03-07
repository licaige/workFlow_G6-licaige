
import Routes from 'router'
import { useInitConfig } from 'hooks'

function App() {
  useInitConfig()
  return <Routes />
}

export default App
