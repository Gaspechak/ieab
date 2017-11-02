<template lang="html">
  <div class="container"> 
    <div id="eventoList" v-show="listEventos == true && imprimirComprovante == false && gerenciar == false && imprimirCadastrados == false"> 
      <div id="myCard" class="card" v-for="item in events">
          <div class="card-header">
              <h5 style="margin-top: 10px;">{{item.titulo}}</h5>          
          </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="text-align: justify;"><b>Descrição do evento: </b>{{item.descricao}}</li>
        </ul>
        <ul class="list-group list-group-flush" v-show="meiaEntrada(item.idadeMeiaEntrada)">
            <li class="list-group-item" style="text-align: justify;"><b>Refeições no evento: </b>{{item.pagamentoMeiaEntrada}}</li>
        </ul>
        <ul class="list-group list-group-flush" v-show="!meiaEntrada(item.idadeMeiaEntrada)">
            <li class="list-group-item" style="text-align: justify;"><b>Refeições no evento: </b>{{item.pagamento}}</li>
        </ul>
        <ul class="list-group list-group-flush">
             <li class="list-group-item" style="text-align: justify;"><b>Contato: </b>{{item.contato}}</li>
        </ul>
        <div class="card-body">
          <div class="text-center" style="margin-top: -8px;">
            <h5><span class="badge badge-warning" v-show="getStatusEvent(item.users) == 'pendente'">Inscrição pendente...</span></h5>
            <h5><span class="badge badge-success" v-show="getStatusEvent(item.users) == 'inscrito'">Inscrição confirmada</span></h5>
            <button v-show="getStatusEvent(item.users) == 'disponivel'" id="btn-inscrever" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#confirmaInscricao">Inscrever-se</button>          
          </div>                   
          <div class="text-center" v-show="getStatusEvent(item.users) == 'inscrito'">
            <button v-show="getStatusEvent(item.users) == 'inscrito'" type="button" class="btn btn-success" @click="printEvent(item)">Imprimir CHECK-IN</button>
          </div>
          <div class="text-center" v-show="getStatusEvent(item.users) == 'inscrito'" style="margin-top: 10px;">
            <h5><span class="badge badge-warning" v-show="getStatusRefeicao(item.usersRefeicao) == 'pendente'">Confirmação da refeições pendente...</span></h5>
            <h5><span class="badge badge-success" v-show="getStatusRefeicao(item.usersRefeicao) == 'inscrito'">Refeições confirmada</span></h5>
            <button v-show="getStatusRefeicao(item.usersRefeicao) == 'disponivel'" id="btn-inscreverRefeicao" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#confirmaInscricaoRefeicao">Confirmar Refeições no Evento</button>          
          </div>   
          <div class="text-center" style="margin-top: 8px;" v-show="getGerenciar() == true">
            <button v-show="getGerenciar() == true" id="btn-gerenciar" type="button" class="btn btn-danger" @click="gerenciarEvento(item['.key'])">Gerenciar Evento</button>
          </div>
          <div class="text-center" style="margin-top: 8px;" v-show="getGerenciar() == true">
            <button v-show="getGerenciar() == true" id="btn-imprimirCadastros" type="button" class="btn btn-info" @click="imprimirCadastros(item['.key'])">Imprimir Cadastrados</button>
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
         <!-- Modal -->
        <div class="modal fade" id="confirmaInscricaoRefeicao" tabindex="-1" role="dialog" aria-labelledby="confirmaInscricaoRefeicaoLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="confirmaInscricaoRefeicaoLabel">Confirmar Refeições no Evento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Deseja realmente confirmar suas refeições no evento?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" @click="increverRefeicao(item['.key'])" data-dismiss="modal">Confimar</button>
              </div>
            </div>
          </div>
        </div>  
      </div>     
    </div> 

    <div v-show="listEventos == false && imprimirComprovante == true && gerenciar == false && imprimirCadastrados == false" class="container text-center">   
      <div class="card">
        <h4 style="margin-top: 8px;"><b>CHECK-IN</b></h4>    
        <h4 style="margin-top: 20px;"><b>NOME:</b> {{this.$root.userData.nome}}</h4>
        <h4><b>CAMPO:</b> {{this.$root.userData.campo}}</h4>  
        <h4><b>TELEFONE:</b> {{this.$root.userData.telefone}}</h4>
        <h4><b>E-MAIL:</b> {{this.$root.userData.email}}</h4>         
        <h4><b>CIDADE:</b> {{this.$root.userData.cidade}} - <b>UF:</b> {{this.$root.userData.uf}}</h4> 
        <h4 v-show="meiaEntrada(eventPrint.idadeMeiaEntrada)"><b>ENTRADA:</b> MEIA</h4> 
        <h4 v-show="!meiaEntrada(eventPrint.idadeMeiaEntrada)"><b>ENTRADA:</b> INTEIRA</h4> 
        <h4 v-show="getStatusRefeicao(eventPrint.usersRefeicao) == 'inscrito'"><b>REFEIÇÕES:</b> SIM</h4> 
        <h4 v-show="getStatusRefeicao(eventPrint.usersRefeicao) != 'inscrito'"><b>REFEIÇÕES:</b> NÃO </h4>  
      </div> 
      <div class="text-center" style="margin-top: 30px;">
        <button type="button" class="btn btn-info" @click="voltarEvento()">Voltar</button>
        <button type="button" class="btn btn-success" @click="printConfirmacao()">Imprimir</button>   
      </div>  
    </div> 

    <div v-show="listEventos == false && imprimirComprovante == false && gerenciar == true && imprimirCadastrados == false" class="container">
      <div class="row">
        <button id="btn-voltaEventos1" type="button" class="btn btn-warning float-left" @click="voltarEvento()">Voltar</button>  
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
                <h6><span class="badge badge-warning" v-show="!user.refeicao">Refeições pendentes...</span></h6>
                <h6><span class="badge badge-success" v-show="user.refeicao">Refeições confirmadas</span></h6>
                <div class="text-center">
                  <button type="button" class="btn btn-success" v-show="!user.refeicao" @click="confirmarRefeicao(user.evento, user.userID)">Confirmar Refeições!</button>
                  <button type="button" class="btn btn-danger" v-show="user.refeicao" @click="cancelarRefeicao(user.evento, user.userID)">Cancelar Refeições!</button>                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="listEventos == false && imprimirComprovante == false && gerenciar == false && imprimirCadastrados == true">   
      <div class="text-center" style="margin-top: -10px;">
        <button type="button" class="btn btn-info" @click="voltarEvento()">Voltar</button>
        <button type="button" class="btn btn-success" @click="printConfirmacao()">Imprimir</button>   
      </div>  
          <h4><span class="badge badge-dark">Nº de Cadastros: {{usersCadastradosImprimir.length}}</span></h4>     
      <div>
      </div>  
      <table class="table table-striped" style="margin-top: 10px;">
        <thead>
          <tr>                    
            <th>Nome</th>
            <th width="150">Telefone</th>

            <th width="40" class="text-center">Idade</th>           
            <th width="70" class="text-center">Refeições</th>
          </tr>
        </thead>
        <tbody>         
          <tr v-for="cadastrado in usersCadastradosImprimirOrderNome">         
            <td>{{cadastrado.nome}}</td>
            <td>{{cadastrado.telefone}}</td>

            <td class="text-center">{{cadastrado.idade}}</td>           
            <td class="text-center" v-show="refeicaoStatus(cadastrado.refeicao) == 'inscrito'">SIM</td>
            <td class="text-center" v-show="refeicaoStatus(cadastrado.refeicao) != 'inscrito'">NÃO</td>
          </tr>
        </tbody>
      </table>     
    </div>
  </div> 
</template>

<script>
import firebase from "../config/firebase";
const db = firebase.database();

export default {
  name: "Eventos",
  data() {
    return {
      listEventos: true,
      gerenciar: false,
      imprimirCadastrados: false,
      imprimirComprovante: false,
      usersCadastrados: [],
      usersCadastradosImprimir: [],
      eventPrint: {}
    };
  },
  computed: {
    usersCadastradosOrderNome: function() {
      function compare(a, b) {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
      }

      return this.usersCadastrados.sort(compare);
    },
    usersCadastradosImprimirOrderNome: function() {
      function compare(a, b) {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
      }

      return this.usersCadastradosImprimir.sort(compare);
    }
  },
  firebase: {
    events: db.ref("events")
  },
  methods: {
    voltarEvento: function() {
      this.listEventos = true;
      this.gerenciar = false;
      this.imprimirCadastrados = false;
      this.imprimirComprovante = false;
    },
    confirm: function(eventId) {
      const userUid = this.$root.user.uid;
      this.$firebaseRefs.events
        .child(eventId)
        .child("users")
        .child(userUid)
        .set(true);
    },
    increverRefeicao: function(eventId) {
      const userUid = this.$root.user.uid;
      this.$firebaseRefs.events
        .child(eventId)
        .child("usersRefeicao")
        .child(userUid)
        .set(false);
    },
    confirmarRefeicao: function(evento, userId) {
      this.$firebaseRefs.events
        .child(evento.uid)
        .child("usersRefeicao")
        .child(userId)
        .set(true);
      this.gerenciarEvento(evento.uid);
    },
    cancelarRefeicao: function(evento, userId) {
      this.$firebaseRefs.events
        .child(evento.uid)
        .child("usersRefeicao")
        .child(userId)
        .set(false);
      this.gerenciarEvento(evento.uid);
    },
    confirmarIncricao: function(evento, userId) {
      this.$firebaseRefs.events
        .child(evento.uid)
        .child("users")
        .child(userId)
        .set(true);
      this.gerenciarEvento(evento.uid);
    },
    cancelarIncricao: function(evento, userId) {
      this.$firebaseRefs.events
        .child(evento.uid)
        .child("users")
        .child(userId)
        .set(false);
      this.gerenciarEvento(evento.uid);
    },
    printEvent: function(itemEvent) {
      this.listEventos = false;
      this.imprimirComprovante = true;
      this.eventPrint = itemEvent;
    },
    printCadastros: function() {
      window.print();
    },
    printConfirmacao: function() {
      window.print();
    },
    meiaEntrada: function(idadeMeiaEntrada) {
      return this.$root.userData.idade <= idadeMeiaEntrada;
    },
    getGerenciar: function() {
      if (
        this.$root.userData != undefined &&
        this.$root.userData.admin == true
      ) {
        return true;
      } else {
        return false;
      }
    },
    getStatusEvent: function(users) {
      const user = this.$root.user;
      switch (users[user.uid]) {
        case undefined:
          return "disponivel";
        case true:
          return "inscrito";
        case false:
          return "pendente";
        default:
          return "disponivel";
      }
    },
    getStatusRefeicao: function(usersRefeicao) {
      const user = this.$root.user;
      if (usersRefeicao != null || usersRefeicao != undefined) {
        switch (usersRefeicao[user.uid]) {
          case undefined:
            return "disponivel";
          case true:
            return "inscrito";
          case false:
            return "pendente";
          default:
            return "disponivel";
        }
      }
    },
    refeicaoStatus: function(refeicao) {
      switch (refeicao) {
        case undefined:
          return "disponivel";
        case true:
          return "inscrito";
        case false:
          return "pendente";
        default:
          return "disponivel";
      }
    },
    imprimirCadastros: function(eventId) {
      this.listEventos = false;
      this.imprimirCadastrados = true;
      this.usersCadastradosImprimir = new Array();
      var self = this;

      db
        .ref("events")
        .child(eventId)
        .once("value", eventSnapshot => {
          db
            .ref("events")
            .child(eventId)
            .child("users")
            .once("value", function(snapshot) {
              snapshot.forEach(function(snapshotChild) {
                db
                  .ref("users")
                  .child(snapshotChild.key)
                  .once("value", function(userSnapshot) {
                    var userCadastrado = userSnapshot.val();
                    var evento = eventSnapshot.val();
                    userCadastrado["refeicao"] =
                      evento.usersRefeicao[snapshotChild.key];
                    userCadastrado["confirmado"] = snapshotChild.val();
                    userCadastrado["evento"] = eventSnapshot;
                    userCadastrado.evento["uid"] = eventId;
                    userCadastrado["userID"] = snapshotChild.key;
                    self.usersCadastradosImprimir.push(userCadastrado);
                  });
              });
            });
        });
    },
    gerenciarEvento: function(eventId) {
      this.listEventos = false;
      this.gerenciar = true;
      this.usersCadastrados = new Array();
      var self = this;

      db
        .ref("events")
        .child(eventId)
        .once("value", eventSnapshot => {
          db
            .ref("events")
            .child(eventId)
            .child("users")
            .once("value", function(snapshot) {
              snapshot.forEach(function(snapshotChild) {
                db
                  .ref("users")
                  .child(snapshotChild.key)
                  .once("value", function(userSnapshot) {
                    var userCadastrado = userSnapshot.val();
                    var evento = eventSnapshot.val();
                    var refeicao = evento.usersRefeicao[snapshotChild.key];
                    if (refeicao == true || refeicao == false) {
                      userCadastrado["refeicao"] = refeicao;
                      userCadastrado["confirmado"] = snapshotChild.val();
                      userCadastrado["evento"] = eventSnapshot;
                      userCadastrado.evento["uid"] = eventId;
                      userCadastrado["userID"] = snapshotChild.key;
                      self.usersCadastrados.push(userCadastrado);
                    }
                  });
              });
            });
        });
    }
  }
};
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
