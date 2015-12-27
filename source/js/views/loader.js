import events from 'pub-sub'
import $ from '$'
import Wave from '../lib/wave'

let $text = $('.loading-message')
var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
let timer = false

var wave = Wave({
  canvas,
  viscosity: 0.95,
  level: 0
})

function renderLoop () {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  wave.draw()
}

function randomDrop () {
  let randomX = Math.floor((Math.random() * 100) + 1)
  wave.addDrop(randomX, 2000)
}

events.on('users:find', _ => {
  randomDrop()
  timer = setInterval(renderLoop, 30)
})

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].innerHTML = message
  wave.setLevel(percentage)
  if (percentage % 25 === 0) {
    randomDrop()
  }
})

events.on('users:updated', _ => {
  clearInterval(timer)
})
