<template>
  <div>
    <main-header></main-header>
    <div id="routes">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  name: 'app',
  components: {
    "main-header": Header 
  }
}
</script>

<style>
#routes {
  padding-bottom: 70px;
  padding-top: 30px;
}
</style>
