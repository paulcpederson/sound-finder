import similarUsers from '../services/similar-users.js'
import Emitter from 'tiny-emitter'
import events from 'pub-sub'

let emitter = new Emitter()

emitter.on('error', err => {
  events.emit('loader:update', {message: err, type: 'error'})
})

emitter.on('data', (percentage, message) => {
  events.emit('loader:update', {percentage: percentage, message: message})
})

emitter.on('done', (users, username) => {
  events.emit('users:updated', users, username)
  events.emit('pane', 3)
})

emitter.on('user', user => {
  events.emit('user:found', user)
})

events.on('users:find', username => similarUsers(username, emitter))
