import Index from '../pages/index/index.vue';
import Select from '../pages/select/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/select',
    name: 'Select',
    component: Select
  },
];

export default createRouter({
  history: createWebHashHistory('/vue3'),
  routes,
});
