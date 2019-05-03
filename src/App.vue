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
            <span class="display-1" style="color: yellow;">BuildingLink</span>   
        </v-toolbar>              
              
         <FacilityDetail/>

        <!-- <v-footer app height="auto" style="background-color: #424242;">       
          <MapControls/> 
        </v-footer> -->

        <!-- <FooterArea>                  
        </FooterArea>     -->

    </v-navigation-drawer>

    <v-content style="padding: 0px;" app>
      <v-container fluid style="padding: 0px;">  
         <Mapbox class="mapElement" style="cursor: pointer;"/>    
          <!-- <CesiumMap/>     -->
      </v-container> 

      <v-footer app height="auto" style="background-color: #424242;">       
         <!-- <MapControls/>  -->
      </v-footer>

    </v-content>

    <v-footer app height="auto" style="background-color: #424242;">       
      <!-- <MapControls/>  -->
    </v-footer>

      <!-- <v-footer app height="auto">        
    </v-footer> -->

  </v-app>
</template>

<script>

import Mapbox from './components/Mapbox.vue';
import CesiumMap from './components/CesiumMap.vue';
import FacilityDetail from './components/FacilityDetail.vue';
import MapControls from './components/MapControls.vue';

export default {
  name: 'app',
  components: {
    FacilityDetail,MapControls,Mapbox,CesiumMap
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
