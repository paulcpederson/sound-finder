/**
* Create a wave on a 2d canvas
*/
import assign from 'object-assign'

const defaultLevel = 50
const defaultColors = ['rgba(0, 139, 188, .8)', 'rgba(33, 47, 75, .8)']

/**
* Create an individual node on the wave
*/
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

/**
* Translate a percent to a pixel value on canvas coordinates
*/
function getHeight (percent, height) {
  return height - Math.floor(height / 100 * percent)
}

/**
* Wave factory function - accepts single options object
* @param {Integer} level  Starting water level of wave (0 - 100)
* @param {Array}   colors Array of two color stings
* @param {Object}  canvas Canvas element to draw the wave on
* @return Object
*/
function getWave ({level = defaultLevel, colors = defaultColors, canvas}) {
  let height = canvas.offsetHeight
  let width = canvas.offsetWidth + 40

  let w = {
    size: 300,
    active: 150,
    amplitude: 1000,
    nodes: [],
    deltas: [],
    ctx: canvas.getContext('2d'),
    level: getHeight(level, height),
    /**
    * Create a ripple effect on surface
    * @param {Integer} x         position of drop (0 - 100)
    * @param {Integer} amplitude Severity of surface distortion (pixels)
    */
    addDrop (x = 50, amplitude = 1250) {
      w.amplitude = amplitude
      w.active = Math.floor(w.size / 100 * x)
    },
    /**
    * Raise or lower water level
    * @param {Integer} percent New water level (0 - 100)
    */
    setLevel (percent) {
      let baseY = getHeight(percent, height)
      w.level = baseY
      w.nodes = w.nodes.map(n => {
        n.baseY = baseY
        return n
      })
    },
    /**
    * Draw the wave - call every frame
    */
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
      for (let i = active + 1; i < w.size; i++) {
        var node = Math.min(i - active, period)
        deltas[i] -= (deltas[i] - deltas[i - 1]) * (1 - 0.01 * node)
      }
      w.nodes.forEach((node, i) => node.updateY(deltas[i]))
      w._drawPath(colors[0], 0, 0)
      w._drawPath(colors[1], 15, 5)
    },
    _resize () {
      width = canvas.width = canvas.offsetWidth + 40;
      height = canvas.height = canvas.offsetHeight
      var length = width / (w.size - 1)
      for (var i = 0; i < w.size; i++) {
        w.nodes[i] = Vertex(length * i, w.level, w.level)
        w.deltas[i] = 0
      }
    },
    _drawPath (color, offsetX, offsetY) {
      let ctx = w.ctx
      let nodes = w.nodes
      ctx.beginPath()
      ctx.moveTo(0, height)
      ctx.fillStyle = color
      ctx.lineTo(nodes[0].x + offsetX, nodes[0].y + offsetY)
      nodes.forEach(n => {
        ctx.lineTo(n.x + offsetX, n.y + offsetY)
      })
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.fill()
    }
  }
  w._resize()
  window.addEventListener('resize', w._resize)
  return w
}

export default getWave
