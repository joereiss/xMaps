<template>
    <div id="" style="font-size: 20px;">       
         <!-- <v-btn theme-light-info color="info">Add Marker</v-btn>       -->

          <loading :active.sync="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel"
            :is-full-page="fullPage">
          </loading>
                             
          <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle"  >
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

           this.$eventHub.$on('Counts', data => {      
                this.getResidentCountsPerBuilding();                   
           });
          
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
                     this.isLoading = false;
                                                        
                }).catch(error => {
                    
                    console.log(error);
                    this.isLoading = false;

                });

            },    
            getFacilityDetail(map, e) {
                let x = 0;
                let y = 0;
            },
            getFacilityDetail1() {
                let x = 0;
                let y = 0;
            },
             getFacilityDetail2(a,b,c,d) {
                let x = 0;
                let y = 0;
            },
            getFacilityDetail3(a,b,c,d) {
                let x = 0;
                let y = 0;
            },
           markerAdded(el) {
                //let marker = el.marker;
                let el1 = el.marker.getElement();
                let facid = el.component.$el.id; 

                let that = this;
               
                el1.addEventListener('click', function(event) {                
                    that.markers.find(function(facility) {
                        if (facility.facid == facid) {
                            that.$eventHub.$emit('FacilityDetail', facility);
                            //return x;
                        }       
                    });
                });
            },                             
        },       
        data() {
            return {
                fullPage: true,
                isLoading: false,
                accessToken: 'pk.eyJ1IjoianJlaXNzIiwiYSI6ImNqdW9hMmtwbjJ4OG00NG52eXd0d29nM24ifQ.1kVrEs5-wL96vqMvuTUI3w',  
                //markers: this.getMarkers(),                 
                markers: this.getResidentCountsPerBuilding(),  
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
