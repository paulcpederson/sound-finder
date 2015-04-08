import similarUsers from '../services/similar-users.js'
import events from 'pub-sub'
import $ from '$'

events.on('users:find', (username) => {
  similarUsers(username).then(response => {
    events.emit('users:updated', response)
    events.emit('pane', 3)
  })
})

// Users get added dynamically, so attach events to the users div
$('#users').on('click', (e) => {
  if (e.target.className == 'play-likes') {
    e.preventDefault()
    let id = e.target.getAttribute('data-id')
    events.emit('player:new', id)
    events.emit('pane', 4)
  }
})
