<template>
  <div id="app">    
    BuildingLink 
    <Mapbox class="mapElement"/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Mapbox from './components/Mapbox.vue'

export default {
  name: 'app',
  components: {   
    Mapbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
  margin-top: 60px;
}


.mapElement {   
   position: absolute;  
   left: 0;
   right: 0;
   width: 100%;
   height: 100%;
}


</style>
