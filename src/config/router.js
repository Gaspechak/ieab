import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Home from '@/components/Home'
import Events from '@/components/Events'

import firebase from 'firebase'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: "home",
    component: Home
  }, {
    path: '/eventos',
    name: "events",
    component: Events
  }, {
    path: '/login',
    name: "login",
    component: Auth
  }]
})

routerInstance.beforeEach((to, from, next) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (to.path != '/' && !user) {
      next('/')
    } else if (to.path != '/' && user) {
      next()
    } else {
      next()
    }
    unsubscribe()
  });
})

export default routerInstance
