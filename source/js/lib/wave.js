/**
* Create a wave on a 2d canvas
*/
const defaultLevel = 50
const defaultColors = ['rgba(0, 139, 188, .8)', 'rgba(33, 47, 75, .8)']
const defaultViscosity = 0.85

/**
* Create an individual node on the wave
*/
function Vertex (x, y, baseY, viscosity) {
  return {
    x,
    y,
    baseY,
    viscosity,
    vy: 0,
    targetY: 0,
    deceleration: 0.95,
    updateY (diffVal) {
      this.targetY = diffVal + this.baseY
      this.vy += this.targetY - this.y
      this.y += this.vy * this.viscosity
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
* Wave factory function - accepts single options object (params below)
* @param {Integer} level     Starting water level of wave (0 - 100)
* @param {Array}   colors    Array of two color stings
* @param {Integer} viscosity Viscosity of wave, higher moves slower (0 - 1)
* @param {Object}  canvas    Canvas element to draw the wave on
* @return Object
*/
function getWave ({level = defaultLevel, colors = defaultColors, viscosity = defaultViscosity, canvas}) {
  let height = canvas.offsetHeight
  let width = canvas.offsetWidth + 40
  viscosity = 1 - viscosity
  let w = {
    size: 300,
    active: 150,
    amplitude: 0,
    nodes: [],
    deltas: [],
    ctx: canvas.getContext('2d'),
    level: getHeight(level, height),
    /**
    * Create a ripple effect on surface
    * @param {Integer} amplitude Severity of surface distortion
    * @param {Integer} x         position of drop (0 - 100) random by default
    */
    addDrop (amplitude = 1250, x) {
      x = x || Math.floor((Math.random() * 100) + 1)
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
      // nodes to the left of the active node
      for (let i = active - 1; i > 0; i--) {
        let node = Math.min(active - i, period)
        deltas[i] -= (deltas[i] - deltas[i + 1]) * (1 - 0.01 * node)
      }
      // nodes to the right of the active node
      for (let i = active + 1; i < w.size; i++) {
        let node = Math.min(i - active, period)
        deltas[i] -= (deltas[i] - deltas[i - 1]) * (1 - 0.01 * node)
      }
      w.nodes.forEach((node, i) => node.updateY(deltas[i]))
      w._drawPath(colors[0], 0, 0)
      w._drawPath(colors[1], 15, 5)
    },
    _resize () {
      width = canvas.width = canvas.offsetWidth + 40
      height = canvas.height = canvas.offsetHeight
      var length = width / (w.size - 1)
      for (var i = 0; i < w.size; i++) {
        w.nodes[i] = Vertex(length * i, w.level, w.level, viscosity)
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
