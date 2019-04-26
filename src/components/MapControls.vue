<template>
    <div id="MapControls">       
        <v-btn raised  @click="setZoomIn()" style="width: 50px;">Zoom In</v-btn>
        <v-btn raised  @click="setZoomOut()">Zoom Out</v-btn>
        <v-btn raised  @click="getFacilityImages()">Images</v-btn>          
    </div>    
</template>

<script>
           
    // import Mapbox from 'mapbox-gl-vue';
    // import 'mapbox-gl/dist/mapbox-gl.css';   
    // import { MglMap, MglMarker } from "vue-mapbox";
   
    const axios = require('axios');

    export default {
      
        name: 'MapControls',

        created() {
                   
              
        },
        mounted() {
          
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
                
        },

        props: {
          
        },   
         methods: {       
                                            
            getFacilityImages() {

              
            }                    
        },       
        data() {
            return {
                // facName: 'Nothing Selected',  
                // facAddr1: '',  
                // facCityStateZip: '',
                // userCount: 0,
                // coor: []
                //markers: this.getMarkers(),                                                   
            }              
        },    
        computed: {
         
        }  
    }

</script>


<style>
   


</style>