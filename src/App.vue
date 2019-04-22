<template>
  <div id="app">
    
    <Mapbox/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Mapbox from './components/Mapbox.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld
    Mapbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
