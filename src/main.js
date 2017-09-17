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
  beforeCreate: function () {
    var self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.user = user
        firebase.database().ref("users").child(user.uid).on('value', function (snapshot) {
          self.userData = snapshot.val()         
        })
      }
    }.bind(this))
  },
    data: {
     user: {},
     userData: {}
  }
})
