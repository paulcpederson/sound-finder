import events from 'pub-sub'
import $ from '$'

// let canvas = document.getElementById('visualizer')
// let context = canvas.getContext('2d')
// let playing = false
// let barWidth = canvas.width / 16

// function resize() {
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight
//   barWidth = canvas.width / 16
// }

// // update the visualizer
// function draw(analyser, data) {
//   analyser.getByteFrequencyData(data)
//   context.clearRect(0, 0, canvas.width, canvas.height)
//   Object.keys(data).forEach(i => {
//     context.fillRect(i * barWidth, 0, barWidth, data[i])
//   })
//   if (playing) {
//     requestAnimationFrame(() => draw(analyser, data))
//   }
// }

// // three colors for waves in the pallette
// // #22A7C1
// // #1DA2BC
// // #3EC3DD

// $('window').on('resize', resize)

events.on('play', (analyser, data) => {
  playing = true
  draw(analyser, data)
  resize()
})

events.on('pause', () => playing = false)
