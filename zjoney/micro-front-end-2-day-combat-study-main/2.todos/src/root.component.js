import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom"
import Home from './home.js'
import About from './about.js'

export default function Root(props) {
  // return <section>{props.name} is mounted! 什么是快乐星球 </section>;

  return (
    <BrowserRouter basename="/todos">
      <div>{props.name}</div>
      {/* 设置点击链接，跳转路由 */}
      <div>
        <Link to="/home">Home</Link> | 
        <Link to="/about">About</Link>
      </div>

      {/* 路由展示 */}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/">
          {/* 路由重定向 */}
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
