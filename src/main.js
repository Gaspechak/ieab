import Vue from 'vue'
import App from './config/App'
import VueFire from 'vuefire'
import router from './config/router'
import firebase from './config/firebase'

Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user
      }
    }.bind(this))
  },
  data: {
    user: {}
  }
})
