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

Vue.config.productionTip = false;
Vue.use(Vuetify, axios);

// Global event bus
Vue.prototype.$eventHub = new Vue(); 

new Vue({
  render: h => h(App),
  el: '#app',
  components: {
      'mapbox': Mapbox
  },

}).$mount('#app')
