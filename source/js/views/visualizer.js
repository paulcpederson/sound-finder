import events from 'pub-sub'
import colors from '../lib/colors'
import player from '../lib/player'
import Wave from '../lib/wave'

var canvas = document.querySelector('.js-player-canvas')
var supportsCanvas = !!(canvas.getContext && canvas.getContext('2d'))
var supportsAudioContext = (window.AudioContext || window.webkitAudioContext)
var visualizerActive = false

// If your browser is awesome, let's make a visualizer!
if (supportsCanvas && supportsAudioContext) {
  var ctx = canvas.getContext('2d')

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
    window.requestAnimationFrame(renderFrame)
  }

  function renderLoop () {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    wave.draw()
  }

  events.on('player:new', (id) => {
    if (!visualizerActive) {
      visualizerActive = true
      renderFrame()
      setInterval(renderLoop, 30)
    }
  })

  // events.on('player:next', () => { })
  // events.on('player:prev', () => { })

  player.ontimeupdate = function () {
    let duration = isNaN(player.duration) ? 300 : player.duration
    wave.setLevel(player.currentTime / duration * 100 + 1)
  }
}
