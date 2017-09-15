<template lang="html">
  <div class="container">
    <div class="card"> 
        <div class="card-header">        
            <h5 style="margin-top: 10px;">TÍTULO AQUI</h5>
        </div>  
      <ul class="list-group list-group-flush">
          <li class="list-group-item" style="text-align: justify;">DESCRIÇÃO AQUI</li>         
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
