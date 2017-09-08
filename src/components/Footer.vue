<template lang="html">
  <nav class="navbar navbar-footer navbar-dark bg-dark" role="navigation">
    <div class="container">
    <h5 style="color: #FFF" > © Todos os direitos reservados Bilulu</h5>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.navbar-footer {
  position: fixed;
  margin-top: 10px; /* negative value of footer height */
  height: 70px;
  width: 100%;
  bottom: 0;
}
</style>
