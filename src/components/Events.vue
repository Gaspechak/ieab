<template lang="html">
  <div class="container"> 
    <div id="eventoList" v-show="listEventos && imprimirComprovante == false"> 
      <div id="myCard" class="card" v-for="item in events">
          <div class="card-header">
              <h5 style="margin-top: 10px;">{{item.titulo}}</h5>          
          </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="text-align: justify;">{{item.descricao}}</li>
        </ul>
        <div class="card-body">
          <h5><span class="badge badge-warning float-right" v-show="getStatus(item.users) == 'pendente'">Inscrição pendende</span></h5>
          <h5><span class="badge badge-success float-right" v-show="getStatus(item.users) == 'inscrito'">Inscrição confirmada</span></h5>
          <button v-show="getStatus(item.users) == 'disponivel'" id="btn-inscrever" type="button" class="btn btn-primary float-right"  data-toggle="modal" data-target="#confirmaInscricao">Inscrever-se</button>          
          <button v-show="getGerenciar() == true" style="margin-right: 10px; margin-top: -10px;" id="btn-gerenciar" type="button" class="btn btn-warning float-left" @click="gerenciarEvento(item['.key'])">Gerenciar Evento</button>
          <button v-show="getStatus(item.users) == 'inscrito'" style="margin-top: -10px;" type="button" class="btn btn-success float-left" @click="imprimirComprovante = true">Imprimir confirmação</button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="confirmaInscricao" tabindex="-1" role="dialog" aria-labelledby="confirmaInscricaoLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="confirmaInscricaoLabel">Confirmar Inscrição no Evento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Deseja realmente confirmar sua presença no evento?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" @click="confirm(item['.key'])" data-dismiss="modal">Confimar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div v-show="imprimirComprovante" class="container text-center">   
      <div class="card">
        <h4><b>CHICK-IN</b></h4>    
        <h4 style="margin-top: 20px;"><b>NOME:</b> {{this.$root.userData.nome}}</h4>
        <h4><b>CAMPO:</b> {{this.$root.userData.campo}}</h4>  
        <h4><b>TELEFONE:</b> {{this.$root.userData.telefone}}</h4>
        <h4><b>E-MAIL:</b> {{this.$root.userData.email}}</h4>
        <h4><b>LOGRADOURO:</b> {{this.$root.userData.logradouro}}</h4>
        <h4><b>NÚMERO:</b> {{this.$root.userData.numero}}</h4>
        <h4><b>BAIRRO:</b> {{this.$root.userData.bairro}} - <b>CEP:</b> {{this.$root.userData.cep}}</h4>    
        <h4><b>CIDADE:</b> {{this.$root.userData.cidade}} - <b>UF:</b> {{this.$root.userData.uf}}</h4>        
        <h4><b>DATA DE NASCIMENTO:</b> {{this.$root.userData.nascimento}}</h4> 
      </div> 
      <div class="text-center" style="margin-top: 30px;">
        <button type="button" class="btn btn-info" @click="imprimirComprovante = false">Voltar</button>
        <button type="button" class="btn btn-success" @click="printConfirmacao()">Imprimir</button>   
      </div>  
    </div> 
    <div v-show="!listEventos && imprimirComprovante == false" class="container">
      <div class="row">
        <button id="btn-voltaEventos" type="button" class="btn btn-warning float-left" @click="listEventos = true">Voltar</button>  
      </div>
      <div class="row" style="margin-top: 10px;"> 
        <table id="table-Cadastrados" class="table table-striped">
          <thead class="thead-inverse">
            <tr>              
              <th style="background-color: #343a40;">Nome Completo</th>
              <th style="background-color: #343a40;">E-mail</th>
              <th style="background-color: #343a40;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersCadastrados">            
              <td>{{user.nome}}</td>
              <td>{{user.email}}</td>             
              <button type="button" class="btn btn-danger" style="margin-top: 4px; width: 100%; right: 100%;" v-show="!user.confirmado" @click="confirmarIncricao(user.eventID, user.userID)">Confirmar Inscrição!</button>
              <td class="alert alert-success text-center" role="alert" v-show="user.confirmado">Inscrição confirmada</td>                           
            </tr>
          </tbody>
        </table>  
      </div>
    </div>
  </div> 
</template>

<script>
import firebase from '../config/firebase'
const db = firebase.database()

export default {
  name: "Eventos",
  data() {
    return {
      listEventos: true,
      imprimirComprovante: false,
      usersCadastrados: []
    }
  },
  firebase: {
    events: db.ref('events')
  },
  methods: {
    confirm: function(eventId) {
      const userUid = this.$root.user.uid
      this.$firebaseRefs.events.child(eventId).child("users").child(userUid).set(false)
    },
    confirmarIncricao: function(eventId, userId) {
      this.$firebaseRefs.events.child(eventId).child("users").child(userId).set(true)
      this.gerenciarEvento(eventId)
    },
    printConfirmacao: function() {
      window.print();
    },
    getGerenciar: function() {
      if (this.$root.userData != undefined && this.$root.userData.admin == true) {
        return true;
      }
      else {
        return false;
      }
    },
    getStatus: function(users) {
      const user = this.$root.user
      switch (users[user.uid]) {
        case undefined:
          return 'disponivel'
        case true:
          return 'inscrito'
        case false:
          return 'pendente'
        default:
          return 'disponivel'
      }
    },
    gerenciarEvento: function(eventId) {
      this.listEventos = false
      this.usersCadastrados = new Array()
      var self = this
      db.ref('events').child(eventId).child("users").once("value", function(snapshot) {
        snapshot.forEach(function(snapshotChild) {
          db.ref("users").child(snapshotChild.key).once('value', function(userSnapshot) {
            var userCadastrado = userSnapshot.val()
            userCadastrado['confirmado'] = snapshotChild.val()
            userCadastrado['eventID'] = eventId
            userCadastrado['userID'] = snapshotChild.key
            self.usersCadastrados.push(userCadastrado)
          })
        });
      });
    }
  }
}
</script>

<style lang="css">
.card {
  width: 100%;
}

.card-header {
  background-color: #343a40;
  font-family: sans-serif;
  font-weight: bold;
  color: white;
}

#titulo {
  align-self: center;
}
</style>
