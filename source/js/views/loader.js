import events from 'pub-sub'
import $ from '$'
import Wave from '../lib/wave'

let $text = $('.loading-message')
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

events.on('users:find', _ => {
  let randomX = Math.floor((Math.random() * 100) + 1)
  wave.addDrop(randomX, 2000)
  timer = setInterval(renderLoop, 30)
})

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].innerHTML = message
  wave.setLevel(percentage)
})

events.on('users:updated', _ => {
  clearInterval(timer)
})
