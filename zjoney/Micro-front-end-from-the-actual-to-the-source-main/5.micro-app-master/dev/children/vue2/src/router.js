import Vue from 'vue';
import VueRouter from 'vue-router';
import Root from './pages/root.vue';
import Home from './pages/page1.vue';
import Table from './pages/table.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 因为vue-router在hash模式下无法设置base，如果基座和子应用都是hash路由，需要创建一个空的路由页面作为根页面，用于设置路由前缀
    // 如果基座应用是history模式则不需要使用root组件包裹
    // path: window.__MICRO_APP_BASE_ROUTE__ || '/',
    path: '/',
    component: Root,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import(/* webpackChunkName: "page2" */ './pages/page2.vue'),
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
      },
    ],
  },
];

export default routes;
