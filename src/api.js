import axios from 'axios'

const proxy = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

export default {
  get(url, options) {
    return proxy.get(url)
  },
  post(url, options) {
    return proxy.post(url)
  },
  put(url, options) {
    return proxy.put(url)
  },
  delete(url) {
    return proxy.delete(url)
  }
}
