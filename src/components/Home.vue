<template>
  <div class="container">
    <div id="banner">
      <img src="static/img/banner.png" class="img-responsive" title="banner" alt="banner">
    </div>
    <div id="cards" class="row text-center">
      <div class="col">
        <div class="card">
          <img class="card-img-top" src="static/img/igreja.jpg">
          <div class="card-body">
            <h4 class="card-title">Congregação Poxoréu</h4>
            <p class="card-text">Sejam bem-vindos a nossa congregação em Poxoréu.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img class="card-img-top" src="static/img/poxoreu.jpg">
          <div class="card-body">
            <h4 class="card-title">Poxoréu - MT</h4>
            <p class="card-text">Ao fundo um cartão postal de nossa cidade Morro da Mesa.</p>
          </div>
        </div>
      </div>
      <div style="margin-left: 4%; margin-right: 4%; margin-top: 10px;">

      <div class="card text-center" >
        <div class="card-header" style="font-family: sans-serif; background-color: #343a40; color: white;">
          <h4 class="card-title" style="margin-bottom: -2px;">Batismo na congregação Poxoréu</h4>
        </div>
        <div class="card-body"> 
          <div style="margin-top: 10px;" id="carouselImagens" class="carousel slide text-center" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselImagens" data-slide-to="0" class="active"></li>
              <li data-target="#carouselImagens" data-slide-to="1"></li>
              <li data-target="#carouselImagens" data-slide-to="2"></li>
              <li data-target="#carouselImagens" data-slide-to="3"></li>
              <li data-target="#carouselImagens" data-slide-to="4"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="static/img/batismo0.jpeg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="static/img/batismo1.jpeg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="static/img/batismo2.jpeg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="static/img/batismo3.jpeg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="static/img/batismo4.jpeg">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselImagens" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselImagens" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
            </div>
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
  padding-bottom: 30px;
}

.card {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
  font-family: sans-serif;
}

.card-img-top {
  width: 100%;
  height: auto;
  min-width: 325px;
}
</style>
