import events from 'pub-sub'
import $ from '$'

let body = document.querySelector('body')
let wrap = document.querySelector('.js-player-section')

$('.js-play').on('click', events.emit.bind(events, 'player:play'))
$('.js-pause').on('click', events.emit.bind(events, 'player:pause'))
$('.js-next').on('click', events.emit.bind(events, 'player:next'))
$('.js-prev').on('click', events.emit.bind(events, 'player:prev'))

window.addEventListener('keydown', (e) => {
  let hasPlayer = wrap.getAttribute('data-player')
  if (e.target === body && hasPlayer) {
    if (e.keyCode === 39) {
      events.emit('player:next')
    }
    if (e.keyCode === 37) {
      events.emit('player:prev')
    }
    if (e.keyCode === 32) {
      events.emit('player:toggle')
    }
  }
})
