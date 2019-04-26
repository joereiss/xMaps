<template>
  <v-app dark>
    <v-toolbar app>
      <!-- <span class="display-2" style="color: yellow;">BuildingLink</span>    -->
      <v-btn flat  @click="sendMessage('ResidentCount')">Resident Counts</v-btn>      
      <v-btn flat  @click="sendMessage('BulletinBoardCount')">Bulletin Board Counts</v-btn>
      <v-btn flat  @click="sendMessage('CalendarEventCounts')">Calendar Events</v-btn>     
    </v-toolbar>

    <v-navigation-drawer app>    
        <v-toolbar flat class="transparent">
            <span class="display-1" style="color: yellow;">BattleBuildings</span>   
        </v-toolbar>              
        
        <!-- <v-list>			
          <v-list-tile>
            <v-list-tile-content>
                <FacilityDetail/>
            </v-list-tile-content>          
          </v-list-tile>							
        </v-list>        -->

         <FacilityDetail/>

    </v-navigation-drawer>

    <v-content style="padding: 0px;" app>
      <v-container fluid style="padding: 0px;">  
         <Mapbox class="mapElement" style="cursor: pointer;"/>    
      </v-container>     
    </v-content>

    <v-footer app height="auto" style="background-color: #424242;">        
    </v-footer>

  </v-app>
</template>

<script>

import Mapbox from './components/Mapbox.vue';
import FacilityDetail from './components/FacilityDetail.vue';

export default {
  name: 'app',
  components: {
    FacilityDetail,
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
