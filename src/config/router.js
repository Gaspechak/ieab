import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Home from '@/components/Home'
import Events from '@/components/Events'
import About from '@/components/About'

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
  },
  {
    path: '/sobre',
    name: "about",
    component: About
  }]
})

routerInstance.beforeEach((to, from, next) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
    if (to.path != '/' && !user) {
      switch (to.path) {
        case '/login':
          next()
          break;
        case '/sobre':
          next()
          break;
        default:
          next('/')
      }
    } else if (to.path == '/login' && user) {
      next('/')
    } else {
      next()
    }
    unsubscribe()
  });
})

export default routerInstance
