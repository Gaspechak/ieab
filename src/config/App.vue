<template>
  <div>
    <main-header></main-header>
    <div id="routes">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'app',
  components: {
    "main-header": Header,
    "main-footer": Footer
  }
}
</script>

<style>
#routes {
  padding-bottom: 70px;
}
</style>
