<template>
    <div id="FacilityDetail" style="font-size: 20px;">       
       
      <v-card>
         <v-card-title raised="true" class="headline text-xs-center" style="color: cornflowerblue;">Facility</v-card-title>
         <v-card-text> 
            <p class="subheading text-lg-left">{{facName}}</p> 
            <p class="subheading text-lg-left">{{facAddr1}}</p> 
            <p class="subheading text-lg-left">{{facCityStateZip}}</p>                      
         </v-card-text>
         <v-card-actions class="text-md-center">            
            <v-btn raised  @click="setZoomIn()" style="width: 50px;" >Zoom In</v-btn>
            <v-btn raised  @click="setZoomOut()">Zoom Out</v-btn>
            <v-btn raised  @click="getFacilityImages()">Images</v-btn>          
         </v-card-actions>
      </v-card>

       <v-card>
         <v-card-title raised="true" class="headline text-xs-center" style="color: cornflowerblue;">Users</v-card-title>         
         <v-card-text>           
            <div style="display: flex;">
              <h4 class="subheading text-lg-left" style="color: white; padding-right: 5px;">All Users</h4>
              <div class="subheading text-lg-right"> {{ userCount }} </div>
            </div>            
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

           this.$eventHub.$on('FacilityDetail', data => {      
                this.facName = data.facName;
                this.facAddr1 = data.facAddress;
                this.facCityStateZip = data.facCityStateZip;
                this.userCount = data.personCount;
                this.coord = data.coor;
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
             
             
            setZoomIn() {
                this.$eventHub.$emit('ZoomIn', this.coord); 
            }, 
            setZoomOut() {
                this.$eventHub.$emit('ZoomOut', this.coord); 
            }, 
            getFacilityImages() {

            },
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
   
#container {
  width: 80%;
  margin: 0 auto;
}

.Card {
  margin: 10px;
  padding: 0px;
}


.btn {
  min-width: 10px;
}

div.btn__content {
  padding-left: 16px;
}

div.card__title {
  padding-left: 0px;
}

div.card__actions {
  padding-left: 0px;
}

</style>




