import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suppliers: [],
  },
  getters: {
    suppliers: state => state.suppliers
  },
  mutators: {
    receiveSuppliers(state, { suppliers }) {
      state.suppliers = suppliers
    }
  },
  actions: {
    fetchSuppliers({ commit }) {
    }
  }
})
