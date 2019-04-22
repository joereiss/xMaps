<template>
    <div id="" style="font-size: 50px;">                             
         <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
    </div>    
</template>

<script>
           
    import Mapbox from 'mapbox-gl-vue';
    import 'mapbox-gl/dist/mapbox-gl.css';

    //import Mapbox from "mapbox-gl";
    import { MglMap } from "vue-mapbox";

    //import 'mapbox-gl/dist/mapbox-gl.css';

    //Vue.component('mapbox', require('mapbox-gl-vue/src/components/Mapbox.vue'));

    export default {
      
        name: 'Mapbox',

        created() {
           // We need to set mapbox-gl library here in order to use it in template
           this.mapbox = Mapbox;
        },
        mounted() {
          
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
                    "sources":  {
                        "mapbox-streets": {
                            "type": "vector",
                            "url": "mapbox://mapbox.mapbox-streets-v6"
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
   #map {
	   width: 750px;
       height: 500px;
   }
</style>
