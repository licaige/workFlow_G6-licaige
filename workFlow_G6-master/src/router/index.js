import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import workFlow from '@/components/workFlow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
    	path: '/workFlow',
      name: 'workFlow',
      component: workFlow
    }
  ]
})
