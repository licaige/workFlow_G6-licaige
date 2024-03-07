import Layout from "layout"
import { HomeComponent } from 'router/components'


const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/home',
      element: <HomeComponent />,
    },
    {
      path: '/about',
      element: <h1>React About Page</h1>,
    },
    { path: '*', element: <div>*</div> },
  ],
}

export default mainRoutes
