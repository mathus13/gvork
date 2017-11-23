import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Kingdoms from '@/components/Kingdoms'
import Parks from '@/components/Parks'
import Park from '@/components/Park'

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
      path: '/parks/:kingdomId?',
      name: 'Parks',
      component: Parks
    },
    {
      path: '/park/:parkId?',
      name: 'Park',
      component: Park
    }
  ]
})
