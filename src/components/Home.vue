<template>
  <div class="container">

    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="static/img/download.svg" alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h3>Titulo</h3>
            <p>Texto....</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="static/img/download.svg" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h3>Titulo</h3>
            <p>Texto....</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="static/img/download.svg" alt="Third slide">
          <div class="carousel-caption d-none d-md-block">
            <h3>Titulo</h3>
            <p>Texto....</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  /*data() {
    return {
      user: {
        name: "sergio"
      },
      titulo: "Página Inicial"
    }
  }
  */
}
</script>

<style scoped>

</style>
