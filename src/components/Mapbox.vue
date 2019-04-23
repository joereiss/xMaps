<template>
    <div id="" style="font-size: 20px;">       
         <v-btn flat  @click="addMarkerTest()">Add Marker</v-btn>      
                         
         <!-- <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle">
             <MglMarker :coordinates="markerCoordinates"  color='green' />
             <MglMarker :coordinates="markerCoordinates1"  color='red' />
             <MglMarker :coordinates="markerCoordinates2"  color='red' />           
         </MglMap>    -->

         <!-- this works -->
         <!-- <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle">
             <div v-for="(field, index) in markers" :key="index">                 
                   <MglMarker :coordinates="field"  color='green' />
             </div>                             
         </MglMap>    -->


          <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle">
             <div v-for="(field, index) in markers" :key="index">  
                 <MglMarker :coordinates="field.coor"  :color="field.color" />                 
             </div>                             
         </MglMap>   


    </div>    
</template>

<script>
           
    import Mapbox from 'mapbox-gl-vue';
    import 'mapbox-gl/dist/mapbox-gl.css';   
    import { MglMap, MglMarker } from "vue-mapbox";
    // import { MglMap } from "vue-mapbox";
    // import { MglMarker } from "vue-mapbox";

    //import Vue from 'nativescript-vue';
    //Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
    //Vue.component('mapbox', require('mapbox-gl-vue/src/components/Mapbox.vue'));

    export default {
      
        name: 'Mapbox',

        created() {
           // We need to set mapbox-gl library here in order to use it in template
           this.mapbox = Mapbox;
          
        },
        mounted() {

            //let x = this.MglMap;

            // this.mapbox.addsource('admin-0', {
            //     type: 'vector',
            //         url: 'mapbox://mapbox.enterprise-boundaries-a0-v2'
            // });

            // MglMap.addsource('admin-0', {
            //     type: 'vector',
            //         url: 'mapbox://mapbox.enterprise-boundaries-a0-v2'
            // });



          //this.mapbox.resize();
        
          // doesn't do anything
          //this.mapbox.height = 1000;
          //this.mapbox.width = 1000;
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
           MglMap, MglMarker           
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },   
         methods: {                     
            getMarkers() {     
                
               let places = [];

               // this works
            //    places.push([-74.0060, 10.7128]);
            //    places.push([-74.0060, 15.7128]);
            //    places.push([-74.0060, 20.7128]);

            //    places.push([-74.0060, 10.7128],'blue');
            //    places.push([-74.0060, 15.7128],'blue');
            //    places.push([-74.0060, 20.7128],'blue');

               places.push({coor: [-74.0060, 10.7128], color: 'blue'});
               places.push({coor: [-74.0060, 30.7128], color: 'red'});
               places.push({coor: [-74.0060, 50.7128], color: 'green'});

               return places;
            }            
        },       
        data() {
            return {
                accessToken: 'pk.eyJ1IjoianJlaXNzIiwiYSI6ImNqdW9hMmtwbjJ4OG00NG52eXd0d29nM24ifQ.1kVrEs5-wL96vqMvuTUI3w',  
                markers: this.getMarkers(),  
                //markerCoordinates: [-74.0060, 40.7128, -74.0060, 47.7128],          
                 //markerCoordinates: [{lng: -74.0060, lat: 40.7128}, {lng: -74.0060, lat: 47.7128}],          
                  //markerCoordinates: [{lat: 40.7128 , lng: -74.0060}, {lat: 47.7128, lng: -74.0060 }],    
                //markerCoordinates: [[-74.0060, 40.7128 ], [-74.0060, 47.7128]],   
                 markerCoordinates:  [-74.0060, 40.7128 ],    
                 markerCoordinates1: [-74.0060, 47.7128 ],     
                 markerCoordinates2: [-74.0060, 33.7128 ],  
                //markerCoordinates: [0,0],   
                mapStyle: {
                    "version": 8,
                    "name": "Mapbox Streets",
                    "sprite": "mapbox://sprites/mapbox/streets-v8",
                    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
                    
                    // http://geojson.xyz/  

                    "sources":  {
                         "mapbox-streets": {
                             "type": "vector",
                             "url": "mapbox://mapbox.mapbox-streets-v8"
                         },
                        "states": {
                             "type": "geojson",
                              "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
                         },
                         "admin-0-map-units": {
                             "type": "geojson",
                              "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_map_units.geojson"
                         }                                                                                                           
                    },
                   "layers":  [{
                                "id": "water",
                                "source": "mapbox-streets",
                                "source-layer": "water",
                                "type": "fill",
                                "paint": {
                                    "fill-color": "#00ffff"
                                }
                            },
                            {
                                "id": "state-borders",
                                "type": "line",
                                "source": "states",
                                "layout": {},
                                "paint": {
                                    "line-color": "#627BC1",
                                    "line-width": 2
                                }
                            },
                            {
                            "id": "admin-0-map-units-borders",
                            "type": "line",
                            "source": "admin-0-map-units",
                            "layout": {},
                            "paint": {
                                "line-color": "#627BC1",
                                "line-width": 2
                            }
                    }]                                       
                }
            }              
        },    
        computed: {
         
        }  
    }

</script>


<style>
   
.css-icon {
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-left: 30px solid #ff8888;
  }

  .css-icon1 {
    display: block;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
  }


</style>



 <!-- <MglMarker :coordinates="markerCoordinates2"  color='blue'>
                  <v-icon slot="marker">mdi-map-marker</v-icon>
             </MglMarker> -->
