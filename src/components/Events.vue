<template lang="html">
  <div class="container">
    <div class="card"> 
        <div class="card-header">        
            <h5 style="margin-top: 10px;">Encontro Setorial de Jovens 3ª Edição</h5>
        </div>  
      <ul class="list-group list-group-flush">
          <li class="list-group-item">Encontro Setorial em Poxoréu (MT) - Data: 09/09/2017 </li>         
      </ul>    
      <div class="card-body">
         <button id="btn-inscrever" type="button" class="btn btn-success float-right">Inscrever-se</button> 
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Eventos"
}
</script>

<style lang="css">
.card {
  margin-top: 10px;
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
