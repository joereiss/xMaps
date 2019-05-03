<template>
    <div id="" style="font-size: 20px;">       
         <!-- <v-btn theme-light-info color="info">Add Marker</v-btn>       -->

          <loading :active.sync="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel"
            :is-full-page="fullPage">
          </loading>
                             
          <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle"  @load="onMapLoad" >    
             <!-- <mgl-navigation-control position="top-right"></mgl-navigation-control> -->
             <div v-for="(field, index) in markers" :key="index">  
                 <MglMarker :coordinates="field.coor"  :color="field.color" :id="field.facid" :define-custom-id="field.facid" @added="markerAdded">                 
                     <MglPopup :id="field.facid" showed="false"  @added="popupAdded">
                        <div style="width: 458px; height: 458px;">                                                        
                            <img v-bind:src='streetViewImageSourceUrl' alt='street view' height="456" width="456">
                        </div>
                    </MglPopup>                                         
                 </MglMarker>                
             </div>      
              <!-- <MglPopup :coordinates="popupCoor" v-if="isPopupVisible" anchor="top" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup> -->
             <!-- <div v-if="isPopupVisible">
             <MglPopup :coordinates="popupCoor"  anchor="top" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup>
             </div> -->
              <!-- <MglPopup :coordinates="popupCoor"  anchor="top" :visible="isPopupVisible" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup> -->
               <!-- <MglPopup :coordinates="popupCoor"  anchor="top" :isOpen="isPopupVisible" :visible="isPopupVisible" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup> -->
             <!-- <div id="mapPopup" style= "display: none;">
             <MglPopup :coordinates="popupCoor"  anchor="top" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup>
             </div> -->
              <!-- <MglPopup  ref="mapPopup" :coordinates="popupCoor"  anchor="top" @close="popupClosed">
                       <div style="width: 458px; height: 458px;">     
                           <VCard> <div>Hello, I'm popup!</div> </VCard>
                       </div>                    
             </MglPopup> -->
         </MglMap>   

         <!-- <Streetview ref="streetViewImage"/> -->

          <!-- <div id="streetView"  ref="StreetviewImage"  v-if="isImageAvailable" style="z-index=100000">                
                <h3>Google Image</h3>
                <img src="streetViewImage" />
          </div> -->

         
         

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
    import { MglMap, MglMarker, MglPopup, MglImage } from "vue-mapbox";
    import Loading from 'vue-loading-overlay';   
    import 'vue-loading-overlay/dist/vue-loading.css';    
    //import GeoPopup from './components/GeoPopup.vue';
    //import GeoPopup from './components/GeoPopup.vue';

    //import Streetview from './Streetview.vue';
   
    const axios = require('axios');

    const zlib = require('zlib');

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
                   easing: function(t) {                      
                       if (t === 1) {
                            if (data !== undefined) {
                                that.getGoogleStreetView(data);
                            }
                       }
                       return t;
                   }
                })
                           
            //    if (data !== undefined) {
            //       //this.getGoogleStreetView(data);
            //    }
              
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

        //    this.mapbox.on('moveend',function(move) {              
        //       let x = 1;
        //       let y = 1;
        //    });
          
        },
        mounted() {

            //this.markers =  this.getResidentCountsPerBuilding();
           
        //    this.mapbox.Popup({closeOnClick: false})
        //     .setLngLat([-96, 37.8])
        //     .setHTML('<h1>Hello World!</h1>')
        //     .addTo(map);


            // this.$refs.map.Popup({closeOnClick: false})
            // .setLngLat([-96, 37.8])
            // .setHTML('<h1>Hello World!</h1>')
            // .addTo(this.$refs.map);

           this.getResidentCountsPerBuilding();
           //this.isPopupVisible = false;
        },

        beforeDestroy () {
                                    
        },  

        //mixins: [MockServer],

        components: {
           MglMap, MglMarker,Loading,MglPopup//,MglImage //,Streetview           
        },

        props: {
            //Direction : {
            //    type: String
            //}
        },   

       watch: {
            'isPopupVisible': {               
                handler(n, o) {

                    if (this.$refs.mapPopup === undefined) {
                        return;
                    }

                    if (n === true) {
                      //this.$refs.mapPopup.addTo(this.mapbox);
                       //let x = new this.mapbox.Popup()

                       //this.$refs.mapPopup.$_addPopup(this.mapbox);
                         this.$refs.mapPopup.$_addPopup(this.$refs.map);

                       //this.$refs.mapPopup.popup.addTo(this.map);
                    } 
                    else  {
                      this.$refs.mapPopup.remove();
                    }     
                    //@click.stop="clickfunction($event)"     
                    //@click.prevent="action"
                    //@submit.prevent="action"        
                },
                //deep: true
            }
        },


         methods: {                     
            onCancel() {                             
                console.log("Loader Cancel "); 
            }, 
            getGoogleStreetView(coor) {
                // info: https://developers.google.com/maps/documentation/streetview/get-api-key
                // secret: KeanZSFvgOIu7sHd3esJjzYfZ4c=
                // key: AIzaSyDDXsU7L4COS6cYpxPCDVIj9z7pUuMIEpo 
                // https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=YOUR_API_KEY

                let loc = 'location=' + coor[1].toString() + ',' + coor[0].toString();
                let size = '&size=456x456';
                let key = '&key=' + 'AIzaSyDDXsU7L4COS6cYpxPCDVIj9z7pUuMIEpo';
                let url = 'https://maps.googleapis.com/maps/api/streetview?' + loc + size + key;
                // let url = 'https://maps.googleapis.com/maps/api/streetview/metadata?' + loc + size + key;

                this.streetViewImageSourceUrl = url;

                return;

                // looks like just setting the url works - no need to make axios call.

                let that = this;

                axios.get(url).then((response) => {
                                      
                    //let y = response;      
                    
                    that.isImageAvailable = true;

                    //that.streetViewImage = "data:image/png;base64," + response.data;
                    //that.streetViewImageSource = "data:image/png;base64," + response.data;

                    //let u8 = new Uint8Array(response.data);
                    //let b = btoa(u8);
                    //let b = zlib.Inflate(response.data);
                     //let b = zlib.Unzip(response.data);
                     let b = zlib.Gunzip(response.data);
                    
                    
                    //that.streetViewImageSource = "data:image/jpg;base64," + b._buffer[0] + b._buffer[1];
                    that.streetViewImageSource = "data:image/jpg;base64," + response.data;


                    //let b = Buffer.from(response.data, 'binary').toString('base64');
                     //let b = Buffer.from(response.data).toString('base64');
                     //let b = btoa(response.data);

                    //that.streetViewImageSource = b;
                    //that.streetViewImageSource = "data:image/jpeg;base64," + b;
                    //that.streetViewImageSource = "data:image/jpg;base64," + b;
                    //that.streetViewImageSource = "data:" + response.data;
                    //that.streetViewImageSource = "data:image/jpeg," + b;
                    //that.streetViewImageSource = "data:image/jpeg," + response.data;

                    //let streetviewImage = that.$refs.streetViewImage;
                    //that.mapbox.methods.addControls(streetviewImage);

                    // How to display image??
                    // this.setBase64(response.data, function(base64Img){
                    //     let img = "<img src='"+ base64Img +"'>";
                    //     that.streetViewImage = img;
                    //     //$('#map_div').html(img);
                    // });

                    //that.isLoading = false;
                                                        
                }).catch(error => {
                    
                    console.log(error);

                    that.isImageAvailable = false;

                    //that.isLoading = false;

                });
            },
            setBase64(url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function() {
                        var reader  = new FileReader();
                        reader.onloadend = function () {
                            callback(reader.result);
                        }
                        reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
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


                    this.isPopupVisible = false;
                                                        
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
                            that.popupCoor = facility.coor;

                            that.isPopupVisible = true;
                            //that.isPopupVisible = false;
                            //let div = document.getElementById("mapPopup");
                            //div.style.display = "block";
                           //let p = new that.MglPopup();
                           //p.setLngLat(facility.coor);
                           //p.addTo(that.mapbox);




                            that.$eventHub.$emit('FacilityDetail', facility);                           
                        }       
                    });                
                });
            },    
            
            popupAdded(event) {
               event.popup.remove();

               //let el = event.popup.getElement();
               //let el = event.component.getElement();
            //    let el = event.component.$listeners;

            //    el.addEventListener('open', (event) => { 
            //        let x = event;
            //    });

               //event.popup.remove();

            },

            popupClosed(event) {
                
                //this.isPopupVisible = false;
            },

            // onMapLoaded(event) {
            //     this.isLoading = false;        
            //     console.log('map loaded');       
            // },
            async onMapLoad(event) {

                const asyncActions = event.component.actions;

                this.isLoading = false;   

                //this.isPopupVisible = false;

                console.log('map loaded - ' + asyncActions);                  
            }                                   
        },       
        data() {
            return {
                fullPage: true,            
                popupCoor: [0,0],
                isPopupVisible: '',  //false - set to empty string so the watcher get intially triggered when setting to false
                streetViewImage: '',
                streetViewImageSource: '',
                streetViewImageSourceUrl: '',
                isImageAvailable: false,
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
