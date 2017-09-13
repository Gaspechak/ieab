<template lang="html">
  <div class="container">

    <div class="card"> 
        <div class="card-header">        
            <h5 style="margin-top: 10px;">Encontro Setorial de Jovens 3ª Edição</h5>
        </div>  
      <ul class="list-group list-group-flush">
          <li class="list-group-item" style="text-align: justify;">O nosso 3° Setorial vem aí! Se prepare pra passar um final de semana 
            intenso. Acontecerá em Poxoréu/MT nos dias 17,18,19 de Novembro e está cheio de novidades que 
            você vai curtir muito. No ano de 2015, em Várzea Grande/MT a Igreja Avivamento Bíblico deu 
            início a mais um projeto ousado, reunimos as nossas igrejas do Campo de Rondonópolis, Poxoréu, 
            Várzea Grande, Cuiabá e Sinop, no ano de 2016 a igreja sede do evento foi Rondonópolis, 
            dando sequência a esse projeto direcionado por Deus. Em 2017 o Campo de Poxoréu, terá o 
            privilégio de sediar a 3° edição do Encontro Setorial de Jovens e Teens, venha conosco fazer 
            parte dessa festa de adoração e celebração ao nosso Deus, serão dias impactantes, onde iremos 
            abordar o tema "Nossa Missão".</li>         
      </ul>    
      <div class="card-body">
         <button id="btn-inscrever" type="button" class="btn btn-primary float-right"  data-toggle="modal" data-target="#confirmaInscricao">Inscrever-se</button> 
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
            <button type="button" class="btn btn-success">Confimar</button>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

export default {
  name: "Eventos",
  data() {
    return {
      inscrever: true,
    }
  },
  methods: {
    inscrevershow: function() {
      this.inscrever = !this.inscrever
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
