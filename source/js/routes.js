import routeMatcher from 'route-matcher'
import events from 'pub-sub'
import sc from 'sound-cloud'

let match = routeMatcher.routeMatcher
let url = document.location.pathname + '/'
url = url.replace('//', '/')

let home = match('/').parse(url)
let user = match('/:username/').parse(url)
let play = match('/:username/play/').parse(url)

if (home) {
  events.emit('pane', 1)
} else if (user) {
  events.emit('users:find', user.username)
  events.emit('pane', 2)
} else if (play) {
  sc.userID(play.username)
  .catch((err) => {
    events.emit('users:404', 'Error finding username. Try again, butterfingers...')
    console.error(err.stack)
  })
  .then(user => {
    events.emit('player:new', user.id)
    events.emit('pane', 4)
  })
} else {
  events.emit('users:404', 'Error finding username. Try again, butterfingers...')
}
