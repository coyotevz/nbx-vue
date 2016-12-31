import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const RECEIVE_SUPPLIERS = 'RECEIVE_SUPPLIERS'

export default new Vuex.Store({
  state: {
    suppliers: [],
  },
  getters: {
    suppliers: state => state.suppliers
  },
  mutations: {
    [RECEIVE_SUPPLIERS](state, { suppliers }) {
      state.suppliers = suppliers
    }
  },
  actions: {
    fetchSuppliers({ commit }) {
      api.get('suppliers').then(response => commit(RECEIVE_SUPPLIERS, response.data))
    }
  }
})
