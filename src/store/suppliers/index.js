import * as actions from './actions'
import * as getters from './getters'

import {
  FETCH_SUPPLIERS,
  FETCH_SUPPLIER,
  // CREATE_SUPPLIER,
  // UPDATE_SUPPLIER,
  // DELETE_SUPPLIER,
  SET_LOADING,
  UNSET_LOADING,
} from './types'

// initial state
const initialState = {
  all: [],
  current: null,
  loading: false,
}

// mutations
const mutations = {
  [FETCH_SUPPLIERS] (state, suppliers) {
    state.all = suppliers
  },
  [FETCH_SUPPLIER] (state, supplier) {
    state.current = supplier
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
