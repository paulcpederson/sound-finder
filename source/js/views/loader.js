import events from 'pub-sub'
import $ from '$'

let $text = $('.loading-message')

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].textContent = message
})

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
var width = canvas.offsetWidth + 40
var height = canvas.offsetHeight

var size = 300
var nodes = []
var deltas = []

// On resize (or on load, build out the nodes)
window.addEventListener('resize', resize)
resize()

function resize () {
  width = canvas.width = canvas.offsetWidth + 40;
  height = canvas.height = canvas.offsetHeight
  var length = width / (size - 1)
  for (var i = 0; i < size; i++) {
    nodes[i] = Vertex(length * i, height / 2, height / 2)
    deltas[i] = 0
  }
}

var active = 150
var amplitude = 1000
var timer = setInterval(update, 30)

function update () {
  ctx.clearRect(0, 0, width, height)
  var period = 18

  amplitude = amplitude * 0.1
  deltas[active] = amplitude

  //nodes to the left of the active node
  for (let i = active - 1; i > 0; i--) {
    var node = Math.min(active - i, period)
    deltas[i] -= (deltas[i] - deltas[i + 1]) * (1 - 0.01 * node)
  }

  // nodes to the right of the active node
  for (let i = active + 1; i < size; i++) {
    var node = Math.min(i - active, period)
    deltas[i] -= (deltas[i] - deltas[i - 1]) * (1 - 0.01 * node)
  }

  nodes.forEach((node, i) => node.updateY(deltas[i]))
  drawPath('rgba(0, 139, 188, .8)', 0, 0)
  drawPath('rgba(33, 47, 75, .8)', 15, 5)
}

function drawPath (color, offsetX, offSetY) {
  ctx.beginPath()
  ctx.moveTo(0, height)
  ctx.fillStyle = color
  ctx.lineTo(nodes[0].x + offsetX, nodes[0].y + offSetY)
  nodes.forEach(n =>  {
    ctx.lineTo(n.x + offsetX, n.y + offSetY)
  })
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.fill()
}

function Vertex (x, y, baseY) {
  return {
    baseY,
    x,
    y,
    vy: 0,
    targetY: 0,
    friction: 0.15,
    deceleration: 0.95,
    updateY (diffVal) {
      this.targetY = diffVal + this.baseY
      this.vy += this.targetY - this.y
      this.y += this.vy * this.friction
      this.vy *= this.deceleration
    }
  }
}

// this creates a "drop" on the surface
canvas.onmousedown = function (e) {
  amplitude = 1000
  active = 170
}
