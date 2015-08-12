import events from 'pub-sub'
import $ from '$'
import Wave from '../lib/wave'

let $text = $('.loading-message')
var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')

var wave = Wave({
  canvas,
  waterLevel: 0
})

var timer = setInterval(function () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  wave.draw()
}, 30)

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].textContent = message
  wave.addDrop(50)
  wave.setWaterLevel(percentage)
})

window.wave = wave

console.log(wave)
