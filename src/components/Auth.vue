<template lang="html">
<div class="container">
  <div class="login-content">
    <div class="row">
      <div class="col-sm-12 col-md-6 d-none d-sm-block" style="margin-top:15px;">
        <div class="card">
          <div class="card-body">
            <img src="static/img/banner.png" class="img-fluid">
          </div>
        </div>
        <div class="card" style="margin-top:15px;">
          <div class="card-body">
            <img src="static/img/igreja.jpg" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6" style="margin-top:15px;">
        <div class="card">
          <div class="card-body" v-show="!loading">
            <div class="alert alert-danger" role="alert" v-show="error != null && error != undefined">
              {{ error }}
            </div>
            <div class="form-group" v-show="cadastro">
              <label>Nome completo</label>
              <input v-model="usuario.nome" type="text" class="form-control" placeholder="ex: Maria Aparecida de Souza">
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-6">
                <div class="form-group">
                  <label>CPF</label>
                  <input v-model="usuario.cpf" type="text" class="form-control" placeholder="ex: 000.000.000-00">
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-group">
                  <label>Nascimento</label>
                  <input v-model="usuario.nascimento" type="date" class="form-control" placeholder="dd/mm/aaaa">
                </div>
              </div>
            </div>
            <div class="form-group" v-show="cadastro">
              <label>Logradouro</label>
              <input v-model="usuario.logradouro" type="text" class="form-control" placeholder="Nome da Avenida, Rua e etc...">
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-4">
                <div class="form-group">
                  <label>Número</label>
                  <input v-model="usuario.numero" type="number" class="form-control">
                </div>
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="form-group">
                  <label>Bairro</label>
                  <input v-model="usuario.bairro" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-4">
                <div class="form-group">
                  <label>CEP</label>
                  <input v-model="usuario.cep" type="number" class="form-control">
                </div>
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="form-group">
                  <label>Complemento</label>
                  <input v-model="usuario.complemento" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-9">
                <div class="form-group">
                  <label>Cidade</label>
                  <input v-model="usuario.cidade" type="text" class="form-control" placeholder="ex: Poxoréu">
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <label>UF</label>
                  <input v-model="usuario.uf" type="text" class="form-control" placeholder="ex: MT">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input v-model="usuario.email" type="email" class="form-control" placeholder="exemplo@exemplo.com">
            </div>
            <div class="form-group">
              <label>Senha</label>
              <input v-model="usuario.senha" type="password" class="form-control" placeholder="•••••••••••••">
            </div>
            <div>
              <button class="btn btn-primary" @click="cadastro = true" v-show="!cadastro">Cadastre-se</button>
              <button class="btn btn-secondary" @click="cadastro = false" v-show="cadastro">Cancelar</button>
              <button class="btn btn-success float-right" @click="Entrar">Entrar</button>
            </div>
          </div>
          <div class="card-body mx-auto" v-show="loading">
            <img src="static/img/loading.svg">
            <h6 style="margin-top: 10px;">Aguarde um momento...</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from '../config/firebase'

export default {
  data() {
    return {
      error: null,
      loading: false,
      cadastro: false,
      usuario: {}
    }
  },
  methods: {
    Entrar() {
      let self = this;
      var router = self.$router
      if (self.cadastro == false) {
        self.loading = true;
        firebase.auth().signInWithEmailAndPassword(self.usuario.email, self.usuario.senha).then(function(user) {
          if (user) {
            console.log(user)
          }
          self.error = null
          self.loading = false;
          router.replace("/")
        }).catch(function(err) {
          if (err) {
            self.error = err.message;
          }
          self.loading = false;
        });
      } else {
        //Fazer cadastro do usuário
      }
    },
  }
}
</script>

<style lang="css">
</style>
