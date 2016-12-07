// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import './filters'

import App from './App'

Vue.use(VueRouter)
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

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<app/>',
  components: { App },
  router,
})
