import events from 'pub-sub'
import $ from '$'

let $wrap = $('.loader-wrap')
let $loader = $('.loader')
let $text = $('.loading-message')

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  if (type == 'error') {
    $loader.addClass('error')
  } else {
    $loader.addClass(`p${percentage}`)
  }
  $text[0].textContent = message
})

events.on('loader:show', () => {
  $wrap.addClass('move-out-right').removeClass('move-out-left').removeClass('move-out-right')
})

events.on('users:updated', () => {
  $text.addClass('move-out-left')
})