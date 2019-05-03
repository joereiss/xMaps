import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import './plugins/vuetify'
import Mapbox from 'mapbox-gl-vue';
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from 'axios';
//import VueAxios from 'vue-axios';
import VueCesium from 'vue-cesium';

Vue.config.productionTip = false;
//Vue.use(Vuetify, axios, VueCesium);
Vue.use(Vuetify, axios, VueCesium, {
  // cesiumPath is path of Cesium.js', for example:
  // local Cesium Build package:
  // cesiumPath: /static/Cesium/Cesium.js
  // Personal online Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // Personal online SuperMap Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // Official Online Cesium Build package：
  cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js'
});

// Global event bus
Vue.prototype.$eventHub = new Vue(); 

new Vue({
  render: h => h(App),
  el: '#app',
  components: {
      'mapbox': Mapbox
  },

}).$mount('#app')
