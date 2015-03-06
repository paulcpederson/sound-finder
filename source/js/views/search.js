import events from 'pub-sub'
import $ from '$'

events.on('search:hide', function () {
  $('.username-form').addClass('move-out-left')
})

events.on('search:show', function () {
  $('.username-form').removeClass('move-out-left')
})