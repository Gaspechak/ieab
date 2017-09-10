<template lang="html">
<div class="container">
  <div class="login-content">
    <div class="row">
      <div class="col-sm-12 col-md-6 d-none d-sm-block">
        <img src="static/img/download.svg" class="img-fluid" alt="Responsive image">
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Nome Completo</label>
              <input type="email" class="form-control" placeholder="ex: Maria Aparecida de Souza">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input type="email" class="form-control" placeholder="exemplo@exemplo.com">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input type="password" class="form-control" placeholder="•••••••••••••">
            </div>
            <div>
              <button class="btn btn-primary">Cadastre-se</button>
              <button class="btn btn-success float-right">Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="css">
.login-content{
  margin-top: 15px;
}
</style>
