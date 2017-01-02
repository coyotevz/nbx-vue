import api from 'src/api'

import {
  FETCH_SUPPLIERS,
  FETCH_SUPPLIER,
  SET_LOADING,
  UNSET_LOADING,
} from './types'

export function fetchSuppliers({ commit }) {
  commit(SET_LOADING)
  return api.get('suppliers')
    .then(response => {
      commit(FETCH_SUPPLIERS, response.data)
      commit(UNSET_LOADING)
    })
}

export function setCurrentSupplier({ commit, state }, id) {
  const intId = parseInt(id)
  const supplier = state.all.find(s => s.$id === intId)
  if (supplier) {
    return commit(FETCH_SUPPLIER, supplier)
  } else {
    commit(SET_LOADING)
    return api.get(`suppliers/${id}`)
      .then(response => {
        commit(FETCH_SUPPLIER, response.data)
        commit(UNSET_LOADING)
      })
  }
}
