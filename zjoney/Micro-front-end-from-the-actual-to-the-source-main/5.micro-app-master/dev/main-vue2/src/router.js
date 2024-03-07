import Vue from 'vue';
import VueRouter from 'vue-router';
import React16 from './pages/react16.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/react16/'
  },
  {
    path: '/react16/*',
    name: 'react16',
    component: React16,
  },
  {
    path: '/react17/*',
    name: 'react17',
    component: () => import(/* webpackChunkName: "react17" */ './pages/react17.vue'),
  },
  {
    path: '/vue2/*',
    name: 'vue2',
    component: () => import(/* webpackChunkName: "vue2" */ './pages/vue2.vue'),
  },
  {
    path: '/vue3/*',
    name: 'vue3',
    component: () => import(/* webpackChunkName: "vue3" */ './pages/vue3.vue'),
  },
  {
    path: '/vite/*',
    name: 'vite',
    component: () => import(/* webpackChunkName: "vite" */ './pages/vite.vue'),
  },
  {
    path: '/angular11/*',
    name: 'angular11',
    component: () => import(/* webpackChunkName: "angular11" */ './pages/angular11.vue'),
  },
  {
    path: '/multiple/*',
    name: 'multiple',
    component: () => import(/* webpackChunkName: "multiple" */ './pages/multiple.vue'),
  },
  {
    path: '/self/*',
    name: 'self',
    component: () => import(/* webpackChunkName: "self" */ './pages/self.vue'),
  },
];

export default routes;
