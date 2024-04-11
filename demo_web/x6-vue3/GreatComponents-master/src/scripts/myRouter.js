(function () {
  let Router = function ({routes}) {
    this.routes = routes
    this.routesMap = {} // 保存路由
    this.curUrl = '' // 保存当前hash值
  }

  Router.prototype.init = function () {
    for (let i = 0; i < this.routes.length; i++) {
      this.map(this.routes[i].path, this.rander(this.routes[i].component))
    }
    console.log(this.routesMap)
    window.addEventListener('hashchange', this.reloadPage.bind(this))
  }

  Router.prototype.reloadPage = function () {
    this.curUrl = location.hash.substring(1) // 获取hash值
    this.routesMap[this.curUrl]() // 执行路由对应函数，渲染对应路由页面
  }

  Router.prototype.map = function (key, callback) {
    this.routesMap[key] = callback
  }

  Router.prototype.rander = function (component) {
    return () => {
      console.log(component)
      // 将component渲染到页面上
    }
  }

  window.myRouter = Router
})()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  { path: '/split', name: '分裂组件', component: () => import('@/views/split') },
  { path: '/pieBarChart', name: 'PieBarChart', component: () => import('@/views/PieBarChart') },
]

let router = new myRouter({
  routes
})

router.init()

{/* <ol><a href="#/split">分裂组件</a></ol>
<ol><a href="#/pieBarChart">饼柱图</a></ol> */}

export {router}