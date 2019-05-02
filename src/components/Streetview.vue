<template>
  <div id="" style="font-size: 20px;">    
  <!-- <button @click="fly"></button> -->
  <!-- <div>Map center is: Lng={{ center.lng }}, Lat={{ center.lat }}</div> -->
   <h2>XXXXXXXXXXXXXXXXXXXXXXXX</h2>
   </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  name: "Streetview",
  //inject: ["mapbox", "map", "actions"],
  inject: ["mapbox", "map"],

  data() {
    return {
      center: null
    };
  },

  created() {
    //this.center = this.map.getCenter();
     this.control = null;
     //this.control = new MapboxGeocoder(this.$props);

     this.$_deferredMount();
  },

  methods: {
    async fly() {
      //const flyResult = await this.actions.flyTo({ center: [10, 10] });
      //this.center = flyResult.center;
    },


   onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this._container.textContent = 'Hello, world';
        return this._container;
    },
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    },


    $_deferredMount() {

      this.map.addControl(this);

      //this.map.addControl(this.control);
      //if (this.input) {
      //  this.control.setInput(this.input);
      //}
    //   this.$_emitEvent("added", { geocoder: this.control });
    //   this.$_bindSelfEvents(Object.keys(geocoderEvents));
    //   this.initial = false;
    },
  }
};
</script>