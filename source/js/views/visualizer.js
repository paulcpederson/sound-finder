import events from 'pub-sub'
import colors from '../lib/colors'
import player from '../lib/player'
import Wave from '../lib/wave'

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
let timer = false

var bass = Wave({
  canvas,
  viscosity: 0.85,
  level: 0,
  colors: [colors.blue, colors.blue]
})

var lowMid = Wave({
  canvas,
  viscosity: 0.8,
  level: 0,
  colors: [colors.green, colors.green]
})

var mid = Wave({
  canvas,
  viscosity: 0.75,
  level: 0,
  colors: [colors.red, colors.red]
})

var treble = Wave({
  canvas,
  viscosity: 0.7,
  level: 0,
  colors: [colors.yellow, colors.yellow]
})

let d = player.dataStream
const PEAK = 800

function renderFrame () {
  player.analyser.getByteFrequencyData(player.dataStream)
  let log = '...'
  if (d[0] + d[1] + d[2] + d[3] > PEAK) {
    log += 'bass'
  }
  if (d[4] + d[5] + d[6] + d[7] > PEAK) {
    log += ' low mid'
  }
  if (d[8] + d[9] + d[10] + d[11] > PEAK) {
    log += ' mid'
  }
  if (d[12] + d[13] + d[14] + d[15] > PEAK) {
    log += ' treble'
  }
  requestAnimationFrame(renderFrame)
  console.log(log)
}

function renderLoop () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  treble.draw()
  mid.draw()
  lowMid.draw()
  bass.draw()
}

events.on('player:new', (id) => {
  renderFrame()
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
  bass.setLevel(player.currentTime / duration * 100)
  lowMid.setLevel(player.currentTime / duration * 100)
  mid.setLevel(player.currentTime / duration * 100)
  treble.setLevel(player.currentTime / duration * 100)
}
