<template>
  <v-app>
    <v-toolbar app>
      <span class="font-weight-light">BuildingLink</span>                 
    </v-toolbar>
    <v-content app>
      <v-container fluid>  
         <Mapbox class="mapElement"/>
      </v-container>     
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import Mapbox from './components/Mapbox.vue';

export default {
  name: 'app',
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
