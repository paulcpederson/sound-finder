import playlist from '../services/playlist'
import player from '../lib/player'
import events from 'pub-sub'
import $ from '$'

let artist = document.querySelector('.js-player-artist')
let title = document.querySelector('.js-player-title')
let wrap = $('.js-player-wrap')
let next = $('.js-next')
let prev = $('.js-prev')
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

function load () {
  player.loadTrack()
  renderInfo()
  events.emit('player:play')
}

events.on('player:new', (id) => {
  playlist(id).then(function (tracks) {
    player.tracks = tracks
    player.loadTrack()
    renderInfo()
    events.emit('player:play')
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

events.on('player:next', () => {
  if (++player.current > player.tracks.length - 1) {
    player.current = 0
  }
  load()
})

events.on('player:prev', () => {
  if (--player.current < 0) {
    player.current = player.tracks.length - 1
  }
  load()
})

player.addEventListener('ended', () => {
  events.emit('player:next')
})
