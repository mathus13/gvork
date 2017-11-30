import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Kingdoms from '@/components/Kingdoms'
import Parks from '@/components/Parks'
import Park from '@/components/Park'
import Player from '@/components/Player'

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
      path: '/park/:parkId',
      name: 'Park',
      component: Park
    },
    {
      path: '/player/:playerId/:parkId?/:kingdonId?',
      name: 'Player',
      component: Player
    }
  ]
})
