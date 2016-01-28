import events from 'pub-sub'
import $ from '$'
import matches from 'dom-matches'

// Users get added dynamically, so attach events to the users div
$('.js-user-wrap').on('click', (e) => {
  if (matches(e.target, '.js-play-likes')) {
    e.preventDefault()
    let id = e.target.getAttribute('data-id')
    events.emit('player:new', id)
    events.emit('pane', 4)
  }
})
