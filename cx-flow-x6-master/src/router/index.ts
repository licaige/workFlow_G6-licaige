import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// routes.push({
//   path: '/',
//   redirect: '/login',
// });

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs',
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/login/index.vue'),
  // },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('../views/demo/tabs/index.vue'),
  },
];

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
