<template>
    <div id="" style="font-size: 20px;">       
         <!-- <v-btn theme-light-info color="info">Add Marker</v-btn>       -->

          <loading :active.sync="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel"
            :is-full-page="fullPage">
          </loading>
                             
          <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle"  @load="onMapLoad" >    
             <div v-for="(field, index) in markers" :key="index">  
                 <MglMarker :coordinates="field.coor"  :color="field.color" :id="field.facid" :define-custom-id="field.facid" @added="markerAdded"/>                 
             </div>                             
         </MglMap>   

          <!-- <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle">
             <div v-for="(field, index) in markers" :key="index">  
                 <MglMarker :coordinates="field"  :color="field.color" />                 
             </div>                             
         </MglMap>    -->

    </div>    


</template>

<script>
           
    import Mapbox from 'mapbox-gl-vue';
    import 'mapbox-gl/dist/mapbox-gl.css';   
    import { MglMap, MglMarker } from "vue-mapbox";
    import Loading from 'vue-loading-overlay';   
    import 'vue-loading-overlay/dist/vue-loading.css';
   
    const axios = require('axios');

    export default {
      
        name: 'Mapbox',

        created() {
           // We need to set mapbox-gl library here in order to use it in template
           this.mapbox = Mapbox;
           let that = this;

           this.$eventHub.$on('Counts', data => {      
                this.getResidentCountsPerBuilding();                   
           });

           this.$eventHub.$on('ZoomIn', data => {      
                
                let map1 = that.$refs.map;
                map1.actions.flyTo({               
                   center: data,
                   zoom: 20,
                   bearing: 0,
                   speed: 0.2,
                   curve: 1,
                   easing: function(t) {return t;}
                })
               
                //this.mapbox.showUserLocation(true);                  
           });

           this.$eventHub.$on('ZoomOut', data => {      
                
                let map1 = that.$refs.map;
                map1.actions.flyTo({               
                   center: data,
                   zoom: 2,
                   bearing: 0,
                   speed: 0.2,
                   curve: 1,
                   easing: function(t) {return t;}
                })
               
                //this.mapbox.showUserLocation(true);                  
           });
          
        },
        mounted() {

            //this.markers =  this.getResidentCountsPerBuilding();
            this.getResidentCountsPerBuilding();
           
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
           MglMap, MglMarker,Loading           
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },   
         methods: {                     
            onCancel() {                             
                console.log("Loader Cancel "); 
            }, 
            getMarkers() {     
                
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

                this.isLoading = true;
                let that = this;
                
                axios.get('http://localhost:3000/getResidentCountsPerBuilding', { params: {facId: 0}}).then((response) => {
                                       
                    let buildings = ''; 

                    for (var i = 0; i < response.data.length; i++) {
                        buildings += response.data[i];
                    }
                     
                    that.markers = JSON.parse(buildings);
                    that.isLoading = false;
                                                        
                }).catch(error => {
                    
                    console.log(error);
                    that.isLoading = false;

                });

            },               
            markerAdded(el) {
                
                let el1 = el.marker.getElement();
                let facid = el.component.$el.id; 
                let that = this;
               
                //el1.addEventListener('click', function(event) {   
                el1.addEventListener('click', (event) => { 
                    that.isLoading = true;             
                    that.markers.find(function(facility) {
                        if (facility.facid == facid) {
                            that.isLoading = false;
                            that.$eventHub.$emit('FacilityDetail', facility);                           
                        }       
                    });
                });
            },     
            // onMapLoaded(event) {
            //     this.isLoading = false;        
            //     console.log('map loaded');       
            // },
            async onMapLoad(event) {

                const asyncActions = event.component.actions;

                this.isLoading = false;   
                console.log('map loaded - ' + asyncActions);                  
            }                                   
        },       
        data() {
            return {
                fullPage: true,
                isLoading: false,
                accessToken: 'pk.eyJ1IjoianJlaXNzIiwiYSI6ImNqdW9hMmtwbjJ4OG00NG52eXd0d29nM24ifQ.1kVrEs5-wL96vqMvuTUI3w',  
                //markers: this.getMarkers(),                 
                //markers: this.getResidentCountsPerBuilding(),  
                markers: [], // this.getResidentCountsPerBuilding(),  
                mapStyle: {
                    "version": 8,
                    "name": "Mapbox Streets",
                    "sprite": "mapbox://sprites/mapbox/streets-v8",
                    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
                    
                    // http://geojson.xyz/  
                    // https://docs.mapbox.com/vector-tiles/reference/mapbox-streets-v8/#overview

                    "sources":  {
                         "mapbox-streets": {
                             "type": "vector",
                              "url": "mapbox://mapbox.mapbox-streets-v8"
                              //"url": "http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/14/4823/6160.mvt"
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
                   "layers":  [


                            {
                                "id": "admin",
                                "source": "mapbox-streets",
                                "source-layer": "admin",
                                "type": "line",
                                "paint": {
                                   "line-color": "#ffffff"
                                }
                            },
                            {
                                "id": "road",
                                "source": "mapbox-streets",
                                "source-layer": "road",
                                "type": "line",
                                "paint": {
                                     "line-color": "#ffffff"
                                }
                            },
                            {
                                "id": "landuse",
                                "source": "mapbox-streets",
                                "source-layer": "landuse",
                                "type": "fill",
                                "paint": {
                                    "fill-color": "rgba(66,100,251, 0.3)",
                                    "fill-outline-color": "rgba(66,100,251, 1)"
                                }
                            },
                            {
                                "id": "place_label",
                                "source": "mapbox-streets",
                                "source-layer": "place_label",
                                "type": "circle",
                                "paint": {
                                    "circle-radius": 3,
                                    "circle-color": "rgba(238,78,139, 0.4)",
                                    "circle-stroke-color": "rgba(238,78,139, 1)",
                                    "circle-stroke-width": 1
                                }
                            },
                            {
                                "id": "structure",
                                "source": "mapbox-streets",
                                "source-layer": "structure",
                                "type": "fill",
                                "paint": {
                                    "fill-color": "rgba(66,100,251, 0.3)",
                                    "fill-outline-color": "rgba(66,100,251, 1)"
                                }
                            },
                            {
                                "id": "housenum_label",
                                "source": "mapbox-streets",
                                "source-layer": "housenum_label",
                                "type": "circle",
                                "paint": {
                                    "circle-radius": 3,
                                    "circle-color": "rgba(238,78,139, 0.4)",
                                    "circle-stroke-color": "rgba(238,78,139, 1)",
                                    "circle-stroke-width": 1
                                }
                            },
                            {
                                "id": "poi_label",
                                "source": "mapbox-streets",
                                "source-layer": "poi_label",
                                "type": "circle",
                                "paint": {
                                    "circle-radius": 3,
                                    "circle-color": "rgba(238,78,139, 0.4)",
                                    "circle-stroke-color": "rgba(238,78,139, 1)",
                                    "circle-stroke-width": 1
                                }
                            },
                            {
                                "id": "transit_stop_label",
                                "source": "mapbox-streets",
                                "source-layer": "transit_stop_label",
                                "type": "circle",
                                "paint": {
                                    "circle-radius": 3,
                                    "circle-color": "rgba(238,78,139, 0.4)",
                                    "circle-stroke-color": "rgba(238,78,139, 1)",
                                    "circle-stroke-width": 1
                                }
                            },
                            {
                                "id": "building",
                                "source": "mapbox-streets",
                                "source-layer": "building",
                                 "type": "fill",
                                //"type": "building:part",
                                //"type": "name",
                                "paint": {
                                    "fill-color": "rgba(66,100,251, 0.3)",
                                    "fill-outline-color": "rgba(66,100,251, 1)"
                                }
                            },
                            {
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
                            },

                           
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


<!-- https://github.com/soal/vue-mapbox/issues/55 -->
 <!-- <MglMarker :coordinates="markerCoordinates2"  color='blue'>
                  <v-icon slot="marker">mdi-map-marker</v-icon>
             </MglMarker> -->



            <!--   <mgl-popup :coordinates="marker.coords" :anchor="top">
				  <div><strong>{[marker.text]}</strong></div>
			  </mgl-popup> -->

          <!--     <mgl-navigation-control position="top-right"></mgl-navigation-control>  -->
