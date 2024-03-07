import Layout from 'layout'

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/micro/*',
      element: <div id="subapp-viewport"></div>,
    },
    { path: '*', element: null },
  ],
}

export default mainRoutes