import playlist from '../services/playlist'
import Player from '../lib/player'
import events from 'pub-sub'
import $ from '$'

let player = Player(document.querySelector('.js-player'))
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
}

events.on('player:new', (id) => {
  playlist(id).then(function (tracks) {
    player.tracks = tracks
    player.loadTrack()
    renderInfo()
    console.log(player.tracks)
  })
  .catch(err => console.log(err))
})

events.on('player:play', () => {
  play.removeClass('hide')
  pause.addClass('hide')
  player.pause()
})

events.on('player:pause', () => {
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

// myaudio.play(); - This will play the music.
// myaudio.pause(); - This will stop the music.
// myaudio.duration; - Returns the length of the music track.
// myaudio.currentTime = 0; - This will rewind the audio to the beginning.
// myaudio.loop = true; - This will make the audio track loop.
// myaudio.muted = true; - This will mute the track
