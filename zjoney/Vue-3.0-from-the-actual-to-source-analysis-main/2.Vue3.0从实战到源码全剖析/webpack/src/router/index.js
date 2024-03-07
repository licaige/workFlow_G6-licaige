import {
  createRouter,
  createWebHashHistory
} from 'vue-router';
import Home from '../views/Home.vue';
import Detail from '../views/Detail.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/detail/:id',
    component: Detail
  }]
});

export default router;