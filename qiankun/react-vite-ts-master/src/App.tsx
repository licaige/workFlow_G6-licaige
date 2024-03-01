import './App.css'
import Hello from './page/Hello'
import Welcome from './page/Welcome'
import ClassInstance from './page/ClassInstance'
import TopContext from './page/TopContext'
import TestUseEffect from './page/TestUseEffect'

function App() {
  return (<>
    <Hello></Hello>
    <Welcome type="跟vue的slot原理类似">
      <p>this is子元素1</p>
      <p>this is子元素2</p>
    </Welcome>
    <ClassInstance/>
    <TopContext/>
    <TestUseEffect/>
  </>)
}

export default App
