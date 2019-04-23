<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">     
        <span class="font-weight-light">BuildingLink</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat  @click="addMarkerTest()">Add Marker</v-btn> -->
    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
      <Mapbox class="mapElement"/>
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import Mapbox from './components/Mapbox.vue';

export default {
  name: 'App',
  components: {
    //HelloWorld
    Mapbox
  },
  data () {
    return {
      //
    }
  },
   methods: {                     
      addMarkerTest() {               
           //let x = this.Mapbox;
           //let y = x;
          //this.$root.$emit('IoTToolbarEvent', msg);
          //this.$root.$emit('msg', msg);
      }            
  },      
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
  margin-top: 60px;
} */


.mapElement {   
   position: absolute;  
   left: 0;
   right: 0;
   width: 100%;
   height: 100%;
}

</style>
