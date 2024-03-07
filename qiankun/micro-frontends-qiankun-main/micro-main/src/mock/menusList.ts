const menusList = [
  {
    id: 1001,
    name: 'React 应用',
    path: '/micro/reactApp',
    icon: 'icon-react',
    children: [
      {
        id: 100101,
        name: '首页',
        path: '/micro/reactApp/home',
        icon: 'icon-shouye',
        children: [],
      },
      {
        id: 100102,
        name: '关于',
        path: '/micro/reactApp/about',
        icon: 'icon-guanyu',
        children: [],
      },
    ],
  },
  {
    id: 1002,
    name: 'Vue 应用',
    path: '/micro/vueApp',
    icon: 'icon-vue',
    children: [
      {
        id: 100201,
        name: '首页',
        path: '/micro/vueApp/home',
        icon: 'icon-shouye',
        children: [],
      },
      {
        id: 100202,
        name: '关于',
        path: '/micro/vueApp/about',
        icon: 'icon-guanyu',
        children: [],
      },
    ],
  },
]

export default menusList