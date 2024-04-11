import React from 'react';
import './App.css';
import Home from './components/Home'
import SongList from './components/SongList'
import Player from './components/Player'
// 使用BrowserRouter路由，地址栏将不会出现#
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/songList/:id" component={SongList}></Route>
          <Route path="/player/:songMid/:songId" component={Player}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>  
    )
  }
}
export default App
