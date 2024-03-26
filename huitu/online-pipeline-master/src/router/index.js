import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../views/Index.vue'
import Index from '../views/draw.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
