// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Material from 'vue-material'
import 'vue-material/dist/vue-material.css'

import Application from './Application'
import routes from './routes'
import themes from './themes'

import Filters from './filters'

Vue.use(Router)
Vue.use(Material)

Vue.use(Filters)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

Vue.material.theme.registerAll(themes)

const router = new Router({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<application/>',
  components: { Application },
  router,
})
