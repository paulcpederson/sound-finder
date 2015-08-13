import events from 'pub-sub'
import $ from '$'
import Wave from '../lib/wave'

let $text = $('.loading-message')
var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')

var wave = Wave({
  canvas,
  level: 0
})

function renderLoop () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  wave.draw()
}

var timer = setInterval(renderLoop, 30)

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].textContent = message
  let randomX = Math.floor((Math.random() * 100) + 1)
  wave.addDrop(randomX, 200)
  wave.setLevel(percentage)
})
