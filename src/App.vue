<template>
  <v-app>
    <v-toolbar app>
      <span class="display-2">BuildingLink</span>   
      <v-btn flat  @click="sendMessage('ResidentCount')">Resident Counts</v-btn>      
      <v-btn flat  @click="sendMessage('BulletinBoardCount')">Bulletin Board Counts</v-btn>
      <v-btn flat  @click="sendMessage('CalendarEventCounts')">Calendar Events</v-btn>     
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
      sendMessage(msg) {               
            this.$eventHub.$emit('Counts', msg);
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
