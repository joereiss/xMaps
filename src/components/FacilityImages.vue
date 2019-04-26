<template>
    <div id="FacilityImages" style="font-size: 20px;">       
       
  
    </div>    
</template>

<script>
           
    // import Mapbox from 'mapbox-gl-vue';
    // import 'mapbox-gl/dist/mapbox-gl.css';   
    // import { MglMap, MglMarker } from "vue-mapbox";
   
    const axios = require('axios');

    export default {
      
        name: 'Mapbox',

        created() {
                   
        //    this.$eventHub.$on('Counts', data => {      
        //         this.getResidentCountsPerBuilding();                   
        //    });

        //    this.$eventHub.$on('FacilityDetail', data => {      
        //         this.facName = data.facName;
        //         this.facAddr1 = data.facAddress;
        //         this.facCityStateZip = data.facCityStateZip;
        //         this.userCount = data.personCount;
        //         this.coord = data.coor;
        //    });
          
        },
        mounted() {
          
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
                
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },   
         methods: {       
                                            
            getFacilityImages() {

                let that = this;
                
                axios.get('http://localhost:3000/getResidentCountsPerBuilding', { params: {facId: 0}}).then((response) => {
                                       
                    let buildings = ''; 

                    for (var i = 0; i < response.data.length; i++) {
                        buildings += response.data[i];
                    }
                     
                    that.markers = JSON.parse(buildings);
                                                        
                }).catch(error => {
                    
                    console.log(error);
                    //this.isLoading = false;

                });
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
   


</style>