let scroll = () => {
  let now = () => new Date().getTime()
  let s = {
    on: (fn) => {
      window.addEventListener('scroll', () => {
        window.requestAnimationFrame(fn)
      })
    },
    to: (el, duration = 400) => {
      let startTime = now()
      let top = 0
      let timer = setInterval( () => {
        let step = Math.min(1, (now() - startTime) / duration)
        let nextPosition = top + step * (el.offsetTop - top)
        window.scrollTo(0, nextPosition)
        if(step == 1) clearInterval(timer)
      }, 12)
    }
  }
  return s
}

export default scroll()