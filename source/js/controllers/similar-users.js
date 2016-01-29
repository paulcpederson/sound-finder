import events from 'pub-sub'
import pushState from '../lib/push-state'
import $ from '$'
import matches from 'dom-matches'

// Users get added dynamically, so attach events to the users div
$('.js-user-wrap').on('click', (e) => {
  if (matches(e.target, '.js-play-likes')) {
    e.preventDefault()
    let id = e.target.dataset.id
    let username = e.target.dataset.username
    events.emit('player:new', id)
    events.emit('pane', 4)
    pushState(`${username}'s favorites`, `/${username}/play/`)
  }
})
