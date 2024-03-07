
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Page1 from './Page1.js';
import Page2 from './Page2.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/react">React应用</Link>
        <Link to="/vue">vue应用</Link>

        <Routes>
          <Route path="/react" element={<Page1></Page1>}></Route>
          <Route path="/vue" element={<Page2></Page2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
