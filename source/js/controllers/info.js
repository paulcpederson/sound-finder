import events from 'pub-sub'
import $ from '$'

// toggle info screen
$('.info-toggle').on('click', () => {
  events.emit('info:toggle')
})
