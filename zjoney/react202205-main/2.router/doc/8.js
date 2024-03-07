//routes  createRoutesFromChildren
let routes = [
  {
    path: '/user',
    element: 'User',
    children: [
      {
        path: '/add',
        element: 'UserAdd'
      }
    ]
  }
]
//打它平台，得到了分支 branch
let branches = [
  {
    path: '/user/add',
    routesMeta: [
      {
        relativePath: '/user',
        route: {
          path: '/user',
          element: 'User'
        }
      },
      {
        relativePath: '/add',
        route: {
          path: '/add',
          element: 'UserAdd'
        }
      }
    ]
  }
]
//remainingPathname
let pathname = '/user/add';
let metaPath = '/user'
let remainingPathname = pathname.slice(metaPath.length);//  
console.log(remainingPathname);// /add