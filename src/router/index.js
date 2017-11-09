import Vue from 'vue'
import Router from 'vue-router'
import SnakePanel from 'components/snake/snake-panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'snake',
      component: SnakePanel
    }
  ]
})
