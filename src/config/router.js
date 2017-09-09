import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/Events'

import firebase from 'firebase'

Vue.use(Router)

const routerInstance = new Router({ 
  routes: [{
    path: '/',
    name: "home",
    component: Home
  }, {
    path: '/eventos',
    name: "events",
    component: Events
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
