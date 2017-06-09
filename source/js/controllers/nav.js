import $ from '$'
import events from 'pub-sub'

$('.js-nav-site').on('click', function (e) {
  e.preventDefault()
  events.emit('pane', 1)
})


$('.js-nav-similar-name').on('click', function (e) {
  e.preventDefault()
  events.emit('pane', 3)
})
