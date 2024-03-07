import React from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import { useEffect } from 'react';
import { loadMicroApp} from 'qiankun'
function App() {
  const containerRef = React.createRef();
 
  useEffect(()=>{
    loadMicroApp({
      name:'m-static',
      entry: 'http://localhost:30000',
      container:containerRef.current
    })
  })
  // keep-alive 可以实现动态的加载
  return (
    <div className="App">
      <BrowserRouter>
          <Link to="/react">React应用</Link>
          <Link to="/vue">Vue应用</Link>
      </BrowserRouter>

      <div ref={containerRef}></div>

      <div id='container'></div>
    </div>  
  );
}

export default App;
