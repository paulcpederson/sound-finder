import similarUsers from '../services/similar-users.js'
import observable from 'observable'
import events from 'pub-sub'

let users = observable()

users( () => {
  events.emit('users:updated')
  events.emit('users:show')
})

events.on('users:find', (username) => {
  similarUsers(username).then(response => {
    users(response)
  })
})

export default users
