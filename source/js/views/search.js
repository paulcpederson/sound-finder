import events from 'pub-sub'
import $ from '$'

events.on('search:hide', function () {
  $('.search-wrap').addClass('move-out-left')
})

events.on('search:show', function () {
  $('.search-wrap').removeClass('move-out-left')
})
