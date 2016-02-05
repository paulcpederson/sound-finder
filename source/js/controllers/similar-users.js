import events from 'pub-sub'
import pushState from '../lib/push-state'
import $ from '$'
import closest from 'dom-closest'

// Users get added dynamically, so attach events to the users div
$('.js-user-wrap').on('click', (e) => {
  e.preventDefault()
  let user = closest(e.target, '.js-play-likes').dataset
  events.emit('player:new', user.id)
  events.emit('pane', 4)
  pushState(`${user.username}'s favorites`, `/${user.username}/play/`)
})
