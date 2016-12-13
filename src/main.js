// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
// import Potion from 'vue-potion'
import Material from 'vue-material'
import 'vue-material/dist/vue-material.css'

import Application from './Application'
import routes from './routes'
import themes from './themes'

import Filters from './filters'

Vue.use(Router)
Vue.use(Resource)
// Vue.use(Potion)
Vue.use(Material)

Vue.use(Filters)

Vue.http.options.root = 'http://localhost:5000/api'

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
