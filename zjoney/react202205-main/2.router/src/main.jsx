import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, NavLink, useRoutes } from './react-router-dom';
import { activeNavProps } from './style';
import routesConfig from './routesConfig';
const LazyPost = React.lazy(() => import('./components/Post'));
function App() {
  let [routes, setRoutes] = React.useState(routesConfig);
  const addRoute = () => {
    const newRoutes = [
      ...routes,
      {
        path: '/post',
        element: (
          <React.Suspense fallback={<div>loading...</div>}>
            <LazyPost />
          </React.Suspense>
        )
      }
    ];
    setRoutes(newRoutes);
  }
  return ((
    <>
      {useRoutes(routes)}
      <button onClick={addRoute}>动态增加路由</button>
    </>
  ))
}
ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li><NavLink to="/" {...activeNavProps}>首页</NavLink></li>
      <li><NavLink to="/user" {...activeNavProps}>用户管理</NavLink></li>
      <li><NavLink to="/profile" {...activeNavProps}>个人中心</NavLink></li>
      <li><NavLink to="/post" {...activeNavProps}>Post</NavLink></li>
    </ul>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
//   /user/*/add  /usr/add