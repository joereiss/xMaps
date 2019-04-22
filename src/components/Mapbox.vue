<template>
    <div id="" style="font-size: 50px;">                             
         <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
    </div>    
</template>

<script>
           
    import Mapbox from 'mapbox-gl-vue';
    import 'mapbox-gl/dist/mapbox-gl.css';   
    import { MglMap } from "vue-mapbox";

 
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
           MglMap           
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },    

        data() {
            return {
                accessToken: 'pk.eyJ1IjoianJlaXNzIiwiYSI6ImNqdW9hMmtwbjJ4OG00NG52eXd0d29nM24ifQ.1kVrEs5-wL96vqMvuTUI3w',              
                mapStyle: {
                    "version": 8,
                    "name": "Mapbox Streets",
                    "sprite": "mapbox://sprites/mapbox/streets-v8",
                    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
                    // "sources":  {
                    //      "mapbox-streets": {
                    //          "type": "vector",
                    //          "url": "mapbox://mapbox.mapbox-streets-v8"
                    //      }


                    "sources":  {
                         "mapbox-streets": {
                             "type": "vector",
                             "url": "mapbox://mapbox.mapbox-streets-v8"
                         },
                        "states": {
                             "type": "geojson",
                              "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
                         }                                                                                                   
                    },
                   "layers":  [
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
                                }
 
                    ]                                       
                }
            }              
        },

        methods: {
            //setActiveComponent: function(component) {
            //   this.activeComponent = component;
            //},                                       
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
   
</style>
