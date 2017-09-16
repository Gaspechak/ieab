<template lang="html">
<div class="header-content">
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <a class="navbar-brand" href="#">IEAB</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" @click="selectMenuItem('home')" v-bind:class="{ active: activeMenuItem === 'home'}">
          <router-link class="nav-link" to="/">Página Inicial</router-link>
        </li>
        <li class="nav-item" @click="selectMenuItem('events')" v-bind:class="{ active: activeMenuItem === 'events'}" v-show="hidden.logout">
          <router-link class="nav-link" to="/eventos">Eventos</router-link>
        </li>
        <li class="nav-item" @click="selectMenuItem('about')" v-bind:class="{ active: activeMenuItem === 'about'}">
          <router-link class="nav-link" to="/sobre">Sobre</router-link>
        </li>
        <li class="nav-item" @click="selectMenuItem('manager')" v-bind:class="{ active: activeMenuItem === 'manager'}" v-show="hidden.logout && hidden.admin">
          <router-link class="nav-link" to="/gerenciar">Gerenciar</router-link>
        </li>
      </ul>
      <span class="navbar-text" v-show="hidden.logout" style="margin-right: 15px; cursor: default;">{{useremail}}</span>
      <div class="form-inline">
        <button class="btn btn-success" @click="OnClickLogin" v-show="hidden.login">Entrar / Cadastrar-se</button>
        <button class="btn btn-danger" @click="OnClickLogout" v-show="hidden.logout">Sair</button>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import firebase from '../config/firebase'

export default {
  name: "header",
  data() {
    return {
      activeMenuItem: 'home',
      useremail: "",
      user: {
        email: "",
        pwd: ""
      },
      hidden: {
        login: false,
        logout: false,
        admin: false
      }
    }
  },
  methods: {
    OnClickLogin() {
      this.$router.push('/login')
      this.hidden.login = false
      /*
      let self = this;
      var router = this.$router
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.pwd).then(function(user) {
        if (user) {
          self.useremail = user.email
          console.log(user)
        }
        $('#modal').modal('hide')
      }).catch(function(err) {
        if (err) {
          alert(err.message)
        }
        $('#modal').modal('hide')
      });
      */
    },
    OnClickLogout() {
      firebase.auth().signOut()
      self.useremail = ""
      this.$router.replace('/')
    },
    selectMenuItem(item) {
      var self = this;
      this.activeMenuItem = item;
      const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
          self.hidden.login = false
          self.hidden.logout = true

          firebase.database().ref('users').child(user.uid).on("value", function(snapshot) {
            var admin = snapshot.child("admin").val()
            if (admin) {
              self.hidden.admin = admin
            }
            else {
              self.hidden.admin = false
            }
          });

          self.useremail = user.email
        } else {
          self.hidden.login = true
          self.hidden.logout = false
        }
        unsubscribe()
      });
    }
  },
  created: function() {
    var self = this
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        self.hidden.login = false
        self.hidden.logout = true

        firebase.database().ref('users').child(user.uid).on("value", function(snapshot) {
          var admin = snapshot.child("admin").val()
          if (admin) {
            self.hidden.admin = admin
          }
          else {
            self.hidden.admin = false
          }
        });

        self.useremail = user.email
      } else {
        self.hidden.login = true
        self.hidden.logout = false
      }
      //unsubscribe()
    });
  }
}
</script>

<style scoped>

</style>
