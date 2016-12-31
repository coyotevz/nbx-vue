import Vue from 'vue'
import Vuex from 'vuex'

import suppliers from './suppliers'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    suppliers
  },
  strict: debug,
})
