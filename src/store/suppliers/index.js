import * as actions from './actions'
import * as getters from './getters'

import {
  FETCH_SUPPLIERS,
  // CREATE_SUPPLIER,
  // UPDATE_SUPPLIER,
  // DELETE_SUPPLIER,
  SET_LOADING,
  UNSET_LOADING,
} from './types'

// initial state
const initialState = {
  all: [],
  loading: false,
}

// mutations
const mutations = {
  [FETCH_SUPPLIERS] (state, suppliers) {
    state.all = suppliers
  },
  [SET_LOADING] (state) {
    state.loading = true
  },
  [UNSET_LOADING] (state) {
    state.loading = false
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations,
}
