<template>
  <div class="viewer">
    <cesium-viewer>
    </cesium-viewer>
  </div>
</template>

<script>
           
    // import Mapbox from 'mapbox-gl-vue';
    // import 'mapbox-gl/dist/mapbox-gl.css';   
    // import { MglMap, MglMarker } from "vue-mapbox";
    import VueCesuium from 'vue-cesium'
    //import CesiumMap from '@/components/cesium-map.vue'

   
    const axios = require('axios');

    export default {
      
        name: 'Mapbox',

        created() {
                   
        
          
        },
        mounted() {
          
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
              // cesium-viewer 
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },   
         methods: {       
                                            
            getFacilityImages() {

                // let that = this;
                
                // axios.get('http://localhost:3000/getResidentCountsPerBuilding', { params: {facId: 0}}).then((response) => {
                                       
                //     let buildings = ''; 

                //     for (var i = 0; i < response.data.length; i++) {
                //         buildings += response.data[i];
                //     }
                     
                //     that.markers = JSON.parse(buildings);
                                                        
                // }).catch(error => {
                    
                //     console.log(error);
                //     //this.isLoading = false;

                // });
            }                    
        },       
        data() {
            return {
                facName: 'Nothing Selected',  
                facAddr1: '',  
                facCityStateZip: '',
                userCount: 0,
                coor: []
                //markers: this.getMarkers(),                                                   
            }              
        },    
        computed: {
         
        }  
    }

</script>


<style>
   
.viewer {
  width: 100%;
  height: 400px;
}


</style>