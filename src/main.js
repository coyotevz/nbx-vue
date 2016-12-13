// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Potion from 'vue-potion'
import Material from 'vue-material'
import 'vue-material/dist/vue-material.css'
import dateFns from 'date-fns'
import accounting from './lib/accounting'

import Application from './Application'
import routes from './routes'
import themes from './themes'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Potion)
Vue.use(Material)

Vue.http.options.root = 'http://localhost:5000/api'

Vue.material.theme.registerAll(themes)

const router = new Router({
  routes
})

Vue.filter('date', value => {
  if (value && value.$date) return dateFns.format(value.$date, 'D/MM/YYYY')
  return value
})

const currencyOptions = {
  symbol: '$',
  decimal: ',',
  thousand: '.',
  precision: 2,
  format: {
    pos: '%s %v',
    neg: '%s (%v)',
    zero: '-',
  }
}

const numberOptions = {
  decimal: ',',
  thousand: '.',
  precision: 2,
}

Vue.filter('money', value => {
  if (!isNaN(value)) return accounting.formatMoney(value, currencyOptions)
  return value
})

Vue.filter('number', value => {
  if (!isNaN(value)) return accounting.formatNumber(value, numberOptions)
  return value
})

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<application/>',
  components: { Application },
  router,
})
