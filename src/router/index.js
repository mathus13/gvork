import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Kingdoms from '@/components/Kingdoms'
import Parks from '@/components/Parks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/kingdoms',
      name: 'Kingdoms',
      component: Kingdoms
    },
    {
      path: '/parks',
      name: 'Parks',
      component: Parks
    }
  ]
})
