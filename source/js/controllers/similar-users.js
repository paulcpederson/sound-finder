import events from 'pub-sub'
import $ from '$'

// Users get added dynamically, so attach events to the users div
$('#users').on('click', (e) => {
  if (e.target.className == 'play-likes') {
    e.preventDefault()
    let id = e.target.getAttribute('data-id')
    events.emit('player:new', id)
    events.emit('pane', 4)
  }
})
