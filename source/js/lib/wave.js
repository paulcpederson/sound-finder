import assign from 'object-assign'

var defaultLevel = 50
var defaultColors = ['rgba(0, 139, 188, .8)', 'rgba(33, 47, 75, .8)']
var size = 300

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

function getWave ({level = defaultLevel, colors = defaultColors, canvas}) {
  var w = {
    active: 150,
    amplitude: 1000,
    nodes: [],
    deltas: [],
    ctx: canvas.getContext('2d'),
    width: canvas.offsetWidth + 40,
    height: canvas.offsetHeight,
    addDrop (percent) {
      w.amplitude = 1000
      w.active = 170
    },
    setLevel (percent) {
      w.nodes = w.nodes.map(n => {
        n.baseY = n.baseY - 80
        return n
      })
    },
    draw () {
      let period = 18
      let deltas = w.deltas
      let active = w.active
      w.amplitude = w.amplitude * 0.1
      deltas[active] = w.amplitude
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
      w.nodes.forEach((node, i) => node.updateY(deltas[i]))
      w._drawPath(colors[0], 0, 0)
      w._drawPath(colors[1], 15, 5)
    },
    _resize () {
      w.width = canvas.width = canvas.offsetWidth + 40;
      w.height = canvas.height = canvas.offsetHeight
      var length = w.width / (size - 1)
      for (var i = 0; i < size; i++) {
        w.nodes[i] = Vertex(length * i, level, level)
        w.deltas[i] = 0
      }
    },
    _drawPath (color, x, y) {
      let ctx = this.ctx
      let nodes = w.nodes
      ctx.beginPath()
      ctx.moveTo(0, w.height)
      ctx.fillStyle = color
      ctx.lineTo(nodes[0].x + x, nodes[ctx, 0].y + y)
      nodes.forEach(n =>  {
        ctx.lineTo(n.x + x, ctx, n.y + y)
      })
      ctx.lineTo(w.width, w.height)
      ctx.lineTo(0, w.height)
      ctx.fill()
    }
  }
  w._resize()
  window.addEventListener('resize', w._resize)
  return w
}

export default getWave
