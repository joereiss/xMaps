<template>
    <div id="" style="font-size: 20px;">       
         <v-btn flat  @click="addMarkerTest()">Add Marker</v-btn>                      
         <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle">
             <MglMarker :coordinates="markerCoordinates"  color='green' />
         </MglMap>
         <!-- <Mapbox ref="map" :accessToken="accessToken" :mapStyle="mapStyle" /> -->
         
    </div>    
</template>

<script>
           
    import Mapbox from 'mapbox-gl-vue';
    import 'mapbox-gl/dist/mapbox-gl.css';   
    import { MglMap } from "vue-mapbox";
    import { MglMarker } from "vue-mapbox";

    //import Vue from 'nativescript-vue';
    //Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
    //Vue.component('mapbox', require('mapbox-gl-vue/src/components/Mapbox.vue'));

    export default {
      
        name: 'Mapbox',

        created() {
           // We need to set mapbox-gl library here in order to use it in template
           this.mapbox = Mapbox;

           //let x = this.MglMap;

        //    this.mapbox.addSource('admin-0', {
        //         type: 'vector',
        //         url: 'mapbox://mapbox.enterprise-boundaries-a0-v2'
        //     });

           //this.mapbox.
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
            addMarkerTest() {               
                //let x = this.Mapbox;
                //let y = x;
                //this.mapbox.AddControls();
                //this.$root.$emit('IoTToolbarEvent', msg);
                //this.$root.$emit('msg', msg);

               //this.$refs.MglMap.nativeView.addMarkers([
               //this.mapbox.nativeView.addMarkers([
               //this.mapbox.methods.addControls([
               //this.$refs.map.nativeView.addMarkers([
               // this.mapbox.props.navControls.addControls([
                //this.mapbox.addMarkers([

               let map = this.$refs.map;
               //let ll = new ({lng: 74.0060, lat: 40.7128});
               //let map1 = parent.$refs.MglMap;


               const mapboxgl = require('mapbox-gl/dist/mapbox-gl');

            //    map.nativeView.addMarkers([
            //         {
            //             lat: 45.137451890638886,
            //             lng:  -67.13734351262877,
            //             title: 'One-line title here',
            //             subtitle: 'Really really nice location',
            //             selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
            //             //onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
            //         }]);

               var el = document.createElement('div');
               el.className = 'css-icon1';

               let that = this;    

               new mapboxgl.Marker(el)
                        //.setLngLat( ll)
                        .setLngLat( [ 74.0060, 40.7128 ])
                        //.setLngLat( [ 74.0060, 40.7128 ])
                        //.addTo(this.mapbox);
                        .addTo(map);   // map.$parent  self.map.$parent




            //    mapboxgl.Marker.addTo({
            //             lat: 40.7128,
            //             lng:  74.0060,
            //             title: 'One-line title here',
            //             subtitle: 'Really really nice location',
            //             selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
            //             onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
            //         });

                    //  this.mapbox.methods.addControls([
                    // {
                    //     lat: 40.7128,
                    //     lng:  74.0060,
                    //     title: 'One-line title here',
                    //     subtitle: 'Really really nice location',
                    //     selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
                    //     onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
                    // }]
                //);








            }            
        },       
        data() {
            return {
                accessToken: 'pk.eyJ1IjoianJlaXNzIiwiYSI6ImNqdW9hMmtwbjJ4OG00NG52eXd0d29nM24ifQ.1kVrEs5-wL96vqMvuTUI3w',    
                markerCoordinates: [74.0060, 40.7128],          
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
           /*  setActiveComponent: function(component) {
               this.ActiveComponent = component;
            }, */
         /*    getActiveComponent: function() {
            
            } */
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
