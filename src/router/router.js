import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/components/pages/Main.vue'
import Payment from '@/components/pages/Payment.vue'
import User from '@/components/pages/User.vue'
import Functions from '@/components/pages/Function.vue'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: MainPage,
    name: 'main'
  }, {
    path: '/payment',
    component: Payment
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/functions/:id',
    component: Functions,
    props: true
  }]
})

export default router;