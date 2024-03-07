import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from 'router/mainRoutes'

const router = (props: any) => createRouter({
  history: createWebHistory(props?.basename || ''),
  routes: [mainRoutes],
})

export default router
