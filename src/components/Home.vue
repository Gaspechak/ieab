<template>
  <div class="container">

    <div id="banner">
      <img src="static/img/banner.png" class="img-responsive" title="banner" alt="banner">
    </div>

    <div id="cards" class="row text/center">
      <div class="col">
        <div class="card">
          <img class="card-img-top" src="static/img/slide2.jpg">
          <div class="card-body">
            <h4 class="card-title">Poxoréu - MT</h4>
            <p class="card-text">Ao fundo uma cartão postal de nossa cidade Morro da Mesa.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img class="card-img-top" src="static/img/slide2.jpg">
          <div class="card-body">
            <h4 class="card-title">Nossa sede em Poxoréu</h4>
            <p class="card-text">Sejam vem-vindos a nossa igreja em Poxoréu.</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped>
.img-responsive {
  display: block;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
}

#banner {
  padding: 30px;
}

.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}

.card-img-top{
  width:100%;
  height:auto;
  min-width: 325px;
}

</style>
