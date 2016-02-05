import routeMatcher from 'route-matcher'
import events from 'pub-sub'
import sc from 'sound-cloud'
let match = routeMatcher.routeMatcher

/**
* Parse URL and navigate to correct pane/state
*/
function parseRoute () {
  let url = document.location.pathname + '/'
  url = url.replace('//', '/')

  let home = match('/').parse(url)
  let user = match('/:username/').parse(url)
  let play = match('/:username/play/').parse(url)

  if (home) {
    document.title = `SoundFinder`
    events.emit('pane', 1)
  } else if (user) {
    document.title = `${user.username}'s similar users`
    // if we already found the similar users, just show them
    let previousUser = document.querySelector('.js-user-wrap')
    if (user.username === previousUser.dataset.username) {
      events.emit('pane', 3)
    } else {
      events.emit('users:find', user.username)
      events.emit('pane', 2)
    }
  } else if (play) {
    document.title = `${play.username}'s favorites`
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
}

export default parseRoute
