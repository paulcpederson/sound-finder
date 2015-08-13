import similarUsers from '../services/similar-users.js'
import Emitter from 'tiny-emitter'
import events from 'pub-sub'
import $ from '$'

let emitter = new Emitter()

emitter.on('error', err => {
  events.emit('loader:update', {message: err, type: 'error'})
})

emitter.on('data', (percentage, message) => {
  events.emit('loader:update', {percentage: percentage, message: message})
})

emitter.on('done', (users) => {
  events.emit('users:updated', users)
  events.emit('pane', 3)
})

events.on('users:find', username => similarUsers(username, emitter))
