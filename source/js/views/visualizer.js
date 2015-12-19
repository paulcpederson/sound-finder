import events from 'pub-sub'
import player from '../lib/player'
import Wave from '../lib/wave'
import $ from '$'

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
let timer = false

var wave = Wave({
  canvas,
  viscosity: .95,
  level: 0
})

function renderLoop () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  wave.draw()
}

events.on('player:new', (id) => {
  // start rendering wave
  timer = setInterval(renderLoop, 30)
})

events.on('player:next', () => {
  // move wave all the way up
})

events.on('player:prev', () => {
  // move wave all the way up
})

events.on('player:play', () => {

})

player.ontimeupdate = function () {
 wave.setLevel(player.currentTime / player.duration * 100)
}
// myaudio.play(); - This will play the music.
// myaudio.pause(); - This will stop the music.
// myaudio.duration; - Returns the length of the music track.
// myaudio.currentTime = 0; - This will rewind the audio to the beginning.
// myaudio.loop = true; - This will make the audio track loop.
// myaudio.muted = true; - This will mute the track

  // wave.setLevel(0)
  // clearInterval(timer)

