import similarUsers from '../services/similar-users.js'
import Emitter from 'tiny-emitter'
import events from 'pub-sub'
import $ from '$'


let emitter = new Emitter()

emitter.on('error', err => {
  events.emit('loader:update', {message: err, type: 'error'})
})

emitter.on('data', data => {
  events.emit('loader:update', data)
})

emitter.on('done', (users) => {
  events.emit('users:updated', users)
  events.emit('pane', 3)
})

events.on('users:find', username => similarUsers(username, emitter))

// Users get added dynamically, so attach events to the users div
$('#users').on('click', (e) => {
  if (e.target.className == 'play-likes') {
    e.preventDefault()
    let id = e.target.getAttribute('data-id')
    events.emit('player:new', id)
    events.emit('pane', 4)
  }
})
