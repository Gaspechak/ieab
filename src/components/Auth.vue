<template lang="html">
<div class="container">
  <div class="login-content">
    <div class="row">
      <div class="col-md-5 d-none d-lg-block" style="margin-top:15px;">
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
      <div class="col" style="margin-top:15px;">
        <div class="card">
          <div class="card-body" v-show="!loading">
            <div class="alert alert-danger" role="alert" v-show="error != null && error != undefined">
              <strong>Houve algum erro:</strong>
              <br>       
              {{ error }}  
            </div>   
            <div class="form-group text-right" style="color: red;" v-show="cadastro">                         
              <h1 style="font-size: 14px;">Campos com * são obrigatórios.</h1>                           
            </div>        
            <div class="form-group" v-show="cadastro">                         
              <label>Nome completo *</label>          
              <input v-model="usuario.nome" type="text" maxlength="200" class="form-control" placeholder="ex: Maria Aparecida de Souza">             
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-6">
                <div class="form-group">                 
                  <label>Campo</label>
                  <input v-model="usuario.campo" type="text" maxlength="100" class="form-control" placeholder="">
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-group">
                  <label>Nascimento *</label>
                  <input v-model="usuario.nascimento" type="date" class="form-control" placeholder="dd/mm/aaaa">
                </div>
              </div>
            </div>
            <div class="form-group" v-show="cadastro">
              <label>Logradouro *</label>
              <input v-model="usuario.logradouro" type="text" maxlength="100" class="form-control" placeholder="Nome da Avenida, Rua e etc...">
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-4">
                <div class="form-group">
                  <label>Número *</label>
                  <input v-model="usuario.numero" type="number" class="form-control">
                </div>
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="form-group">
                  <label>Bairro *</label>
                  <input v-model="usuario.bairro" type="text" maxlength="100" class="form-control">
                </div>
              </div>
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-12 col-md-4">
                <div class="form-group">
                  <label>CEP *</label>
                  <input v-model="usuario.cep" type="number" class="form-control">
                </div>
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="form-group">
                  <label>Complemento</label>
                  <input v-model="usuario.complemento" type="text" maxlength="100" class="form-control">
                </div>
              </div>
            </div>
            <div class="row" v-show="cadastro">
              <div class="col-sm-9">
                <div class="form-group">
                  <label>Cidade *</label>
                  <input v-model="usuario.cidade" type="text" maxlength="100" class="form-control" placeholder="ex: Poxoréu">
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <label>UF *</label>
                  <input v-model="usuario.uf" type="text" maxlength="2" class="form-control" placeholder="ex: MT">
                </div>
              </div>             
            </div> 
            <div v-show="cadastro">
              <div class="form-group">
                <label>Telefone/Celular *</label>
                <input v-model="usuario.telefone" type="text" maxlength="20" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label v-show="cadastro">E-mail *</label>
              <label v-show="!cadastro">E-mail</label>
              <input v-model="usuario.email" type="email" class="form-control" placeholder="exemplo@exemplo.com">
            </div>
            <div class="form-group">
              <label v-show="cadastro">Senha *</label>
              <label v-show="!cadastro">Senha</label>
              <input v-model="usuario.senha" type="password" class="form-control" placeholder="•••••••••••••">
            </div>             
            <div>
              <button class="btn btn-primary" @click="cadastro = true; error = null;" v-show="!cadastro">Cadastre-se</button>
              <button class="btn btn-secondary" @click="cadastro = false; error = null;" v-show="cadastro">Cancelar</button>
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

      self.usuario.email = this.StringNotNull(self.usuario.email);
      self.usuario.senha = this.StringNotNull(self.usuario.senha);

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
            if (err.message == "The email address is badly formatted.") {
              self.error = "O endereço de e-mail está mal formatado.";
            }
            else if (err.message == "The password is invalid or the user does not have a password.") {
              self.error = "A senha é inválida ou o usuário não possui uma senha.";
            }
            else {
              self.error = err.message;
            }
          }
          self.loading = false;
        });
      }
      else {
        if (this.ValidaUsuario()) {
          self.loading = true;
          firebase.auth().createUserWithEmailAndPassword(self.usuario.email, self.usuario.senha).then(function(user) {
            firebase.database().ref("users").child(user.uid).set(self.usuario).then(function(users) {
              if (user) {
                console.log(user)
              }
              self.error = null
              self.loading = false;
              router.replace("/")
            });
          }).catch(function(err) {
            if (err) {
              if (err.message == "The email address is badly formatted.") {
                self.error = "O endereço de e-mail está mal formatado.";
              }
              else if (err.message == "The password must be 6 characters long or more.") {
                self.error = "A senha deve ter 6 caracteres ou mais.";
              }
              else {
                self.error = err.message;
              }
            }
            self.loading = false;
          });
        }
        else {  
          this.error = "Dados incorretos: " + this.error;   
          document.body.scrollTop = 0; // For Chrome, Safari and Opera 
          document.documentElement.scrollTop = 0; // For IE and Firefox
        }
      }
    },
    ValidaUsuario() {

      var retorno = true;

      if (this.usuario.nome == null || this.usuario.nome == undefined) {
        this.error = "* Nome não informado. ";
        retorno = false;
      }
      else if (this.usuario.nome.length < 8) {
        this.error = "* O nome deve ter 8 caracteres ou mais.. ";
        retorno = false;
      }

      if (isNaN(new Date(this.usuario.nascimento).valueOf())) {
        this.error = this.StringNotNull(this.error) + "* Data de nascimento inválida. ";
        retorno = false;
      }

      if (this.usuario.logradouro == null || this.usuario.logradouro == undefined || this.usuario.logradouro == "") {
        this.error = this.StringNotNull(this.error) + "* Logradouro não informado. ";
        retorno = false;
      }

      if (this.usuario.numero == null || this.usuario.numero == undefined || this.usuario.numero == "") {
        this.error = this.StringNotNull(this.error) + "* Número não informado. ";
        retorno = false;
      }

      if (this.usuario.bairro == null || this.usuario.bairro == undefined || this.usuario.bairro == "") {
        this.error = this.StringNotNull(this.error) + "* Bairro não informado. ";
        retorno = false;
      }

      if (this.usuario.cep == null || this.usuario.cep == undefined || this.usuario.cep == "") {
        this.error = this.StringNotNull(this.error) + "* CEP não informado. ";
        retorno = false;
      }

      if (this.usuario.cidade == null || this.usuario.cidade == undefined || this.usuario.cidade == "") {
        this.error = this.StringNotNull(this.error) + "* Cidade não informada. ";
        retorno = false;
      }

      if (this.usuario.uf == null || this.usuario.uf == undefined) {
        this.error = this.StringNotNull(this.error) + "* UF não informada. ";
        retorno = false;
      }
      else if ("AC-AL-AP-AM-BA-CE-DF-ES-GO-MA-MT-MS-MG-PA-PB-PR-PE-PI-RJ-RN-RS-RO-RR-SC-SP-SE-TO".indexOf(this.usuario.uf) == -1) {
        this.error = this.StringNotNull(this.error) + "* UF inválida. ";
        retorno = false;
      }

      if (this.usuario.telefone == null || this.usuario.telefone == undefined) {
        this.error = this.StringNotNull(this.error) + "* Telefone/Celular não informada. ";
        retorno = false;
      }
      else if (this.usuario.telefone.length < 8) {
        this.error = this.StringNotNull(this.error) + "* A Telefone/Celular deve ter 8 caracteres ou mais.";
        retorno = false;
      }

      if (this.usuario.email == null || this.usuario.email == undefined || this.usuario.email == "") {
        this.error = this.StringNotNull(this.error) + "* E-mail não informado. ";
        retorno = false;
      }

      if (this.usuario.senha == null || this.usuario.senha == undefined) {
        this.error = this.StringNotNull(this.error) + "* Senha não informada. ";
        retorno = false;
      }
      else if (this.usuario.senha.length < 6) {
        this.error = this.StringNotNull(this.error) + "* A senha deve ter 6 caracteres ou mais.";
        retorno = false;
      }

      return retorno;
    },
    StringNotNull(value) {
      if (value != null && value != undefined) {
        return value;
      }
      else {
        return "";
      }
    }
  }
}
</script>

<style lang="css">

</style>
