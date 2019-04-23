import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'


import Vuetify from 'vuetify'

import Mapbox from 'mapbox-gl-vue';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  render: h => h(App),

  el: '#app',
  components: {
      'mapbox': Mapbox
  },

}).$mount('#app')
