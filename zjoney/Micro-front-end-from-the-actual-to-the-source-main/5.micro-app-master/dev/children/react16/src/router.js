import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link, HashRouter } from 'react-router-dom'
import Page1 from './pages/page1/page1'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

const Page2 = lazy(() => import(/* webpackChunkName: "page2" */ './pages/page2/page2'))
const Inline = lazy(() => import(/* webpackChunkName: "inline" */ './pages/inline/inline'))

function getDefaultKey () {
  const url = window.location.href
  if (url.includes('page2')) {
    return 'page2'
  } else if (url.includes('inline')) {
    return 'inline'
  }
  return 'home'
}

function App () {
  return (
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/micro-app/react16/'} >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[getDefaultKey()]}
        style={{marginBottom: '5px'}}
      >
        <Menu.Item key='home' icon={<AppstoreOutlined />}>
          <Link to='/'>home</Link>
        </Menu.Item>
        <Menu.Item key='page2' icon={<MailOutlined />}>
          <Link to='/page2'>page2</Link>
        </Menu.Item>
        <Menu.Item key='inline' icon={<MailOutlined />}>
          <Link to='/inline'>inline</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/" exact>
          <Page1 />
        </Route>
        <Route path="/page2">
          <Suspense fallback={<div>Loading...</div>}>
            <Page2 />
          </Suspense>
        </Route>
        <Route path="/inline">
          <Suspense fallback={<div>Loading...</div>}>
            <Inline />
          </Suspense>
        </Route>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
