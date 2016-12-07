// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'

Vue.use(VueResource)
Vue.use(VueMaterial)

Vue.http.options.root = 'http://localhost:5000/api'

Vue.material.theme.registerAll({
  default: {
    primary: 'blue',
    accent: 'pink'
  },
  white: {
    primary: 'white',
    accent: 'blue',
  }
})

Vue.filter('date', (value) => {
  if (value) return Date(value.$date)
  return value
})

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<App/>',
  components: { App }
})
