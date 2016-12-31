import api from 'src/api'

import {
  FETCH_SUPPLIERS,
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
