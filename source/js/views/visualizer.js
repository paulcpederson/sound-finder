import events from 'pub-sub'
import colors from '../lib/colors'
import player from '../lib/player'
import Wave from '../lib/wave'

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
let timer = false

var wave = Wave({
  canvas,
  viscosity: 0.95,
  level: 0,
  colors: [colors.blue, colors.blue]
})

let d = player.dataStream

function renderFrame () {
  player.analyser.getByteFrequencyData(d)

  let sum = d.reduce((x, y) => x + y)
  let amplitude = 0

  if (sum > 2000) { amplitude = 800 }
  if (sum > 2500) { amplitude = 1000 }
  if (sum > 2750) { amplitude = 1250 }
  if (sum > 3000) { amplitude = 1800 }

  wave.addDrop(amplitude)
  requestAnimationFrame(renderFrame)
}

function renderLoop () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  wave.draw()
}

events.on('player:new', (id) => {
  renderFrame()
  timer = setInterval(renderLoop, 30)
})

// events.on('player:next', () => { })
// events.on('player:prev', () => { })

player.ontimeupdate = function () {
  let duration = isNaN(player.duration) ? 300 : player.duration
  wave.setLevel(player.currentTime / duration * 100 + 1)
}
