import events from 'pub-sub'
import pushState from '../lib/push-state'
import $ from '$'
import closest from 'dom-closest'

// Users get added dynamically, so attach events to the users div
$('.js-user-wrap').on('click', (e) => {

  e.preventDefault()
  let user = closest(e.target, '.js-play-likes')
  let username = user.getAttribute('data-username')
  events.emit('player:new', user.getAttribute('data-id'))
  pushState(`${username}'s favorites`, `/${username}/play/`)
  events.emit('pane', 4)
})
