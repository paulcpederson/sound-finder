import $ from './query'

let loader = $('.loader')
let text = $('.messages')

let notify = (percentage = 0, message = '', stype = 'info') => {
  loader.textContent = message
  loader.addClass(`p${percentage}`)
}

export default notify;