import {BrowserRouter, Link, Routes,Route} from 'react-router-dom'
import Page1 from './page-1.js';
import Page2 from './page-2.js';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Link to="/react">React项目</Link>  
          <Link to="/vue">Vue项目</Link>  

          <Routes>
            <Route path="/react/*" element={<Page1/>}></Route>
            <Route path="/vue/*" element={<Page2/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
