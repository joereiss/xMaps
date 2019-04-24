<template>
    <div id="FacilityDetail" style="font-size: 20px;">       
       

      <v-card>
         <v-card-title raised="true" class="headline text-xs-center">Facility</v-card-title>
         <v-card-text>

            <v-layout align-center row hide-details>
                <v-flex xs3>
                    <v-subheader>Facility Name</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-text-field
                        readonly  
                    >
                    xxxxxxxx
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout align-center row hide-details>
                <v-flex xs3>
                    <v-subheader>Adress</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-text-field
                        readonly  
                    >
                    yyyyyyyy
                    </v-text-field>
                </v-flex>
            </v-layout>

             <v-layout align-center row hide-details>
                <v-flex xs3>
                    <v-subheader>User Count</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-text-field
                        readonly  
                    >
                    10000
                    </v-text-field>
                </v-flex>
            </v-layout>

        </v-card-text>

      </v-card>

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
                   
           this.$eventHub.$on('Counts', data => {      
                this.getResidentCountsPerBuilding();                   
           });
          
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
            getFacilityDetail() {     
                
               let places = [];
                      
               //    places.push({coor: [-74.0060, 10.7128], color: 'blue'});
               //    places.push({coor: [-74.0060, 30.7128], color: 'red'});
               //    places.push({coor: [-74.0060, 50.7128], color: 'green'});

               places.push({coor: {'lon': -74.0060, 'lat': 10.7128}, color: 'blue'});
               places.push({coor: {'lon': -74.0060, 'lat': 30.7128}, color: 'red'});
               places.push({coor: {'lon': -74.0060, 'lat': 50.7128}, color: 'green'});
        
               return places;
            },
            getResidentCountsPerBuilding() {

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
                x: '',  
                //markers: this.getMarkers(),                                                   
            }              
        },    
        computed: {
         
        }  
    }

</script>


<style>
   


</style>




