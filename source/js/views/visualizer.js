import events from 'pub-sub'
import player from '../lib/player'
import Wave from '../lib/wave'
import $ from '$'

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
let timer = false

let yellow = 'RGBA(255, 230, 83, 1)'
let red = 'RGBA(249, 139, 151, 1)'
let green = 'RGBA(28, 194, 199, 1)'
let blue = 'RGBA(0, 122, 224, 1)'

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
  timer = setInterval(renderLoop, 30)
})

events.on('player:next', () => {
  // move wave all the way up
})

events.on('player:prev', () => {
  // move wave all the way up
})

events.on('player:play', () => {
  // start up frequency channels render loop
})

events.on('player:play', () => {
  // stop frequency channels render loop
})

player.ontimeupdate = function () {
  // have to check duration for NaN
  let duration = player.duration !== player.duration ? 300 : player.duration
  wave.setLevel(player.currentTime / duration * 100)
}
