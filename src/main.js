import Vue from 'vue'
import App from './App.vue'

import Mapbox from 'mapbox-gl-vue';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  el: '#app',
  components: {
      'mapbox': Mapbox
  },

}).$mount('#app')
