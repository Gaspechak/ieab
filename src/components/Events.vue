<template lang="html">
  <div class="container"> 
    <div id="eventoList" v-show="listEventos && imprimirComprovante == false"> 
      <div id="myCard" class="card" v-for="item in events">
          <div class="card-header">
              <h5 style="margin-top: 10px;">{{item.titulo}}</h5>          
          </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="text-align: justify;"><b>Descrição do evento: </b>{{item.descricao}}</li>
        </ul>
        <ul class="list-group list-group-flush" v-show="meiaEntrada(item.idadeMeiaEntrada)">
            <li class="list-group-item" style="text-align: justify;"><b>Forma de Pagamento: </b>{{item.pagamentoMeiaEntrada}}</li>
        </ul>
        <ul class="list-group list-group-flush" v-show="!meiaEntrada(item.idadeMeiaEntrada)">
            <li class="list-group-item" style="text-align: justify;"><b>Forma de Pagamento: </b>{{item.pagamento}}</li>
        </ul>
        <ul class="list-group list-group-flush">
             <li class="list-group-item" style="text-align: justify;"><b>Contato: </b>{{item.contato}}</li>
        </ul>
        <div class="card-body">
          <div class="text-center" style="margin-top: -8px;">
            <h5><span class="badge badge-warning" v-show="getStatus(item.users) == 'pendente'">Inscrição pendende...</span></h5>
            <h5><span class="badge badge-success" v-show="getStatus(item.users) == 'inscrito'">Inscrição confirmada</span></h5>
            <button v-show="getStatus(item.users) == 'disponivel'" id="btn-inscrever" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#confirmaInscricao">Inscrever-se</button>          
          </div>          
          <div class="text-center" v-show="getStatus(item.users) == 'inscrito'">
            <button v-show="getStatus(item.users) == 'inscrito'" type="button" class="btn btn-success" @click="printEvent(item)">Imprimir confirmação</button>
          </div>
          <div class="text-center" style="margin-top: 8px;" v-show="getGerenciar() == true">
            <button v-show="getGerenciar() == true" id="btn-gerenciar" type="button" class="btn btn-danger" @click="gerenciarEvento(item)">Gerenciar Evento</button>
          </div>
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
            <h4 style="margin-top: 8px;"><b>CHECK-IN</b></h4>    
            <h4 style="margin-top: 20px;"><b>NOME:</b> {{this.$root.userData.nome}}</h4>
            <h4><b>CAMPO:</b> {{this.$root.userData.campo}}</h4>  
            <h4><b>TELEFONE:</b> {{this.$root.userData.telefone}}</h4>
            <h4><b>E-MAIL:</b> {{this.$root.userData.email}}</h4>         
            <h4><b>CIDADE:</b> {{this.$root.userData.cidade}} - <b>UF:</b> {{this.$root.userData.uf}}</h4> 
            <h4 v-show="meiaEntrada(eventPrint.idadeMeiaEntrada)"><b>ENTRADA:</b> MEIA</h4> 
            <h4 v-show="!meiaEntrada(eventPrint.idadeMeiaEntrada)"><b>ENTRADA:</b> INTEIRA</h4> 
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
        <div class="card">
          <div class="card-header" style="margin-bottom: 25px;">
            Inscritos no Evento
          </div>
          <div class="card-body" v-for="user in usersCadastradosOrderNome">
            <div class="card" style="margin-top: -25px;">
              <div style="margin: 10px;">
                <h6><b>Nome: </b> {{user.nome}}</h6>
                <h6><b>Idade: </b> {{user.idade}}</h6> 
                <h6><b>E-mail: </b> {{user.email}}</h6> 
                <h6><b>Cidade: </b> {{user.cidade}} <b> UF: </b> {{user.uf}}</h6> 
                <h6><b>Telefone: </b> {{user.telefone}}</h6> 
                <h6><span class="badge badge-warning" v-show="!user.confirmado">Inscrição pendende...</span></h6>
                <h6><span class="badge badge-success" v-show="user.confirmado">Inscrição confirmada</span></h6>
                <div class="text-center">
                  <button type="button" class="btn btn-success" v-show="!user.confirmado" @click="confirmarIncricao(user.evento, user.userID)">Confirmar Inscrição!</button>
                  <button type="button" class="btn btn-danger" v-show="user.confirmado" @click="cancelarIncricao(user.evento, user.userID)">Cancelar Inscrição!</button>                   
                </div>
              </div>
            </div>
          </div>
        </div>
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
      usersCadastrados: [],
      eventPrint: {}
    }
  }, 
  computed: {
  usersCadastradosOrderNome: function() {
      function compare(a, b) {
        if (a.nome < b.nome)
          return -1;
        if (a.nome > b.nome)
          return 1;
        return 0;
      }

      return this.usersCadastrados.sort(compare);
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
    confirmarIncricao: function(evento, userId) {
      this.$firebaseRefs.events.child(evento['.key']).child("users").child(userId).set(true)
      this.gerenciarEvento(evento)
    },
     cancelarIncricao: function(evento, userId) {
      this.$firebaseRefs.events.child(evento['.key']).child("users").child(userId).set(false)
      this.gerenciarEvento(evento)
    },
    printEvent: function(itemEvent)
    {
      this.imprimirComprovante = true
      this.eventPrint = itemEvent
    },   
    printConfirmacao: function() {
      window.print();
    },
    meiaEntrada: function(idadeMeiaEntrada) {    
      return this.$root.userData.idade <= idadeMeiaEntrada 
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
    gerenciarEvento: function(evento) {
      this.listEventos = false
      this.usersCadastrados = new Array()
      var self = this     
      db.ref('events').child(evento['.key']).child("users").once("value", function(snapshot) {
        snapshot.forEach(function(snapshotChild) {
          db.ref("users").child(snapshotChild.key).once('value', function(userSnapshot) {
            var userCadastrado = userSnapshot.val()
            userCadastrado['confirmado'] = snapshotChild.val()
            userCadastrado['evento'] = evento
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
