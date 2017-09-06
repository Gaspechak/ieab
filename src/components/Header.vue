<template lang="html">
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <a class="navbar-brand" href="#">IEAB</a>

      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-bind:class="{ active: isActive('home') }">
            <router-link v-on:click="setActive('home')" class="nav-link" to="/">Página Inicial</router-link>
          </li>
          <li class="nav-item" v-bind:class="{ active: isActive('events') }" v-show="hidden.logout">
            <router-link v-on:click="setActive('events')" class="nav-link" to="eventos">Eventos</router-link>
          </li>
        </ul>
        <span class="navbar-text" v-show="hidden.logout" style="margin-right: 15px; cursor: default;">{{useremail}}</span>
      </div>
      <button class="btn btn-success" v-show="hidden.login" data-toggle="modal" data-target="#modal">Entrar</button>
      <button class="btn btn-danger" v-on:click="OnClickLogout" v-show="hidden.logout">Sair</button>
      <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Fazer login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                 <label for="exampleInputEmail1">Endereço de E-mail</label>
                 <input v-model="user.email" type="email" class="form-control" placeholder="examplo@dominio.com">
               </div>
               <div class="form-group">
                 <label for="exampleInputPassword1">Senha</label>
                 <input v-model="user.pwd" type="password" class="form-control" placeholder="••••••••••••••">
               </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button v-on:click="OnClickLogin" type="button" class="btn btn-primary">Entrar</button>
            </div>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
import firebase from '../config/firebase'

export default {
  name: "header",
  data() {
    return {
      activeItem: 'home',
      useremail: "",
      user: {
        email: "",
        pwd: ""
      },
      hidden: {
        login: false,
        logout: false,
      }
    }
  },
  methods: {
    OnClickLogin() {
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
    },
    OnClickLogout() {
      firebase.auth().signOut()
      self.useremail = ""
      this.$router.replace('/')
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem // no need for Vue.set()
    }
  },
  created: function() {
    var self = this
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        self.hidden.login = false
        self.hidden.logout = true
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
