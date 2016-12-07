import Vue from 'vue'

Vue.filter('date', (value) => {
  if (value) return Date(value.$date)
  return value
})
