import playlist from '../services/playlist'
import player from '../lib/player'
import events from 'pub-sub'
import $ from '$'

let artist = document.querySelector('.js-player-artist')
let title = document.querySelector('.js-player-title')
let playerSection = document.querySelector('.js-player-section')
let wrap = $('.js-player-wrap')
let play = $('.js-play')
let pause = $('.js-pause')

function renderInfo () {
  wrap.addClass('fade-in').removeClass('hide')
  let current = player.tracks[player.current]
  artist.innerHTML = current.user.username
  artist.href = current.user.permalink_url
  title.innerHTML = current.title
  title.href = current.permalink_url
}

events.on('player:new', (id) => {
  playerSection.setAttribute('data-player', true)
  playlist(id).then(function (tracks) {
    player.tracks = tracks
    player.loadTrack()
    renderInfo()
  })
  .catch(err => console.log(err))
})

events.on('player:pause', () => {
  play.removeClass('hide')
  pause.addClass('hide')
  player.pause()
})

events.on('player:play', () => {
  play.addClass('hide')
  pause.removeClass('hide')
  player.play()
})

events.on('player:toggle', () => {
  if (play[0].classList.contains('hide')) {
    events.emit('player:pause')
  } else {
    events.emit('player:play')
  }
})

events.on('player:next', () => {
  if (++player.current > player.tracks.length - 1) {
    player.current = 0
  }
  player.loadTrack()
  renderInfo()
  events.emit('player:play')
})

events.on('player:prev', () => {
  if (--player.current < 0) {
    player.current = player.tracks.length - 1
  }
  player.loadTrack()
  renderInfo()
  events.emit('player:play')
})
