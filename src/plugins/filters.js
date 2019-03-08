import Vue from 'vue'
import moment from 'moment'

const filters = () => {
  Vue.filter('formatDate', (date) => {
    if (!date) return ''
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return time
  })
  Vue.filter('formatDateNoSS', (date) => {
    if (!date) return ''
    const time = moment(date).format('YYYY-MM-DD')
    return time
  })
  Vue.filter('status', (state) => {
    return state === 2 ? '失效' : '有效'
  })
}

export default filters
