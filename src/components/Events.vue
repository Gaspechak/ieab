<template lang="html">
  <div class="container">

    <div v-show="inscrever" class="card"> 
        <div class="card-header">        
            <h5 style="margin-top: 10px;">Encontro Setorial de Jovens 3ª Edição</h5>
        </div>  
      <ul class="list-group list-group-flush">
          <li class="list-group-item">Encontro Setorial em Poxoréu (MT) - Data: 09/09/2017 </li>         
      </ul>    
      <div class="card-body">
         <button id="btn-inscrever" type="button" class="btn btn-success float-right" v-on:click="inscrevershow">Inscrever-se</button> 
      </div> 
    </div>

    <form v-show="!inscrever" style="margin-top: 10px;">
      <div class="form-group" >
        <label for="lbl-email">E-mail do usuário</label>
        <input class="form-control" id="txt-email" autocomplete='off'>        
      </div>
       <div class="form-group">
        <label for="lbl-senha">Senha de acesso</label>
        <input type="password" class="form-control" id="txt-password" autocomplete='off'>
      </div>  
      <div class="form-group">
        <label for="lbl-nome">Nome completo</label>
        <input type="text" class="form-control" id="txt-nome" style="text-transform:uppercase;">
      </div>  
      <div class="form-group">
        <label for="lbl-cpf">CPF</label>
        <input type="text" class="form-control" id="txt-cpf">
      </div>  
      <div class="form-group">
        <label for="lbl-campo">Campo</label>
        <input type="text" class="form-control" id="txt-campo" style="text-transform:uppercase;">
      </div>  
      <div class="form-group">
        <label for="lbl-datanascimento">Data de nascimento</label>
        <input type="date" class="form-control" id="txt-datanascimento" style="width: 180px;">
      </div>  
      <div class="form-group">
        <label for="lbl-logradouro">Logradouro</label>
        <input type="text" class="form-control" id="txt-logradouro" style="text-transform:uppercase;">
        <small id="logradouroHelper" class="form-text text-muted">Nome da Avenida, Rua e etc...</small>
      </div>  
      <div class="form-group">
        <label for="lbl-numero">Número</label>
        <input type="text" class="form-control" id="txt-numero" style="text-transform:uppercase;">
        <small id="numeroHelper" class="form-text text-muted">Número do imóvel</small>
      </div>  
      <div class="form-group">
        <label for="lbl-bairro">Bairro</label>
        <input type="text" class="form-control" id="txt-bairro" style="text-transform:uppercase;">
      </div>  
      <div class="form-group">
        <label for="lbl-complemento">Complemento</label>
        <input type="text" class="form-control" id="txt-complemento" style="text-transform:uppercase;">
      </div>  
      <div class="form-group">
        <label for="lbl-cep">CEP - Código de endereçamento postal</label>
        <input type="text" pattern="[0-9]*" name="shoe-size" class="form-control" id="txt-cep" style="width: 110px;" maxlength="8">
      </div>       
      <div class="form-group">
        <label for="lbl-cidade">Cidade</label>
        <input type="text" class="form-control" id="txt-cidade" style="text-transform:uppercase;">          
      </div> 
      <div class="form-group">
        <label for="lbl-UF">UF</label>
        <input type="text" class="form-control" id="txt-uf" style="width: 50px; text-transform:uppercase;" maxlength="2">
      </div>
     

      <button id="btn-salvar" type="button" class="btn btn-success float-left">Salvar</button> 
      <button id="btn-voltar" type="button" class="btn btn-info float-right" v-on:click="inscrevershow">Voltar</button> 
    </form>



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
