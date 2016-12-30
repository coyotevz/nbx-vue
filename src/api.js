import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

export default {
  getSuppliers(cb, cbError) {
    server.get('suppliers').then(response => {
      cb(response.data)
    }).catch(error => {
      if (cbError !== undefined) {
        cbError(error)
      }
    })
  }
}
