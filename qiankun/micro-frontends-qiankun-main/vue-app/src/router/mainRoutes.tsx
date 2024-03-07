import Layout from "layout/index.vue"
import { HomeComponent, AboutComponent } from 'router/components'

const mainRoutes = {
  path: '/',
  component: Layout,
  children: [
    {
      path: '/home',
      component: HomeComponent,
    },
    {
      path: '/about',
      component: AboutComponent,
    },
    { path: '*', component: { template: '<div>*</div>' }, },
  ],
}

export default mainRoutes
