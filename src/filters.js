import dateFns from 'date-fns'
import accounting from './lib/accounting'

const currencyOptions = {
  symbol: '$',
  decimal: ',',
  thousand: '.',
  precision: 2,
  format: {
    pos: '%s %v',
    neg: '%s (%v)',
    zero: '-',
  }
}

const numberOptions = {
  decimal: ',',
  thousand: '.',
  precision: 2,
}

export default function filters(Vue) {
  if (filters.installed) {
    return
  }

  Vue.filter('date', value => {
    if (value && value.$date) return dateFns.format(value.$date, 'DD/MM/YYYY')
    return value
  })

  Vue.filter('money', value => {
    if (!isNaN(value)) return accounting.formatMoney(value, currencyOptions)
    return value
  })

  Vue.filter('number', value => {
    if (!isNaN(value)) return accounting.formatNumber(value, numberOptions)
    return value
  })
}
