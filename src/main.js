// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Material from 'vue-material'
import 'vue-material/dist/vue-material.css'

import Application from './Application'
import routes from './routes'
import store from './store'
import themes from './themes'
import Filters from './filters'
import 'stylesheet/main.scss'

Vue.use(Router)
Vue.use(Material)

Vue.use(Filters)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

Vue.material.registerTheme(themes)
Vue.material.setCurrentTheme('default')

window.Vue = Vue

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    let mainContent = document.querySelector('.main-content')

    if (mainContent) {
      mainContent.scrollTop = 0
    }

    app.closeSidenav()
    next()
  })
})

let App = Vue.component('app', Application)

let app = new App({
  store,
  el: '#application',
  router,
})
