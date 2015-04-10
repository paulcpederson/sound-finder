import events from 'pub-sub'
import $ from '$'

events.on('info:toggle', () => {
  $('.info').toggleClass('is-active')
})
