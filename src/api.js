import axios from 'axios'

const proxy = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

export default {
  get(url, options) {
    return proxy.get(url, options)
  },
  post(url, options) {
    return proxy.post(url, options)
  },
  put(url, options) {
    return proxy.put(url, options)
  },
  delete(url) {
    return proxy.delete(url)
  }
}
