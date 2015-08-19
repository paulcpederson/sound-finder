import assign from 'object-assign'

function getPlayer (element) {
  let context = new (window.AudioContext || window.webkitAudioContext)
  let source = context.createMediaElementSource(element)
  let analyser = context.createAnalyser()
  analyser.fftSize = 32
  let dataStream = new Uint8Array(analyser.frequencyBinCount)
  source.connect(analyser)
  analyser.connect(context.destination)

  var player = {
    analyser,
    dataStream,
    current: 0,
    next () {
      this.current++
      this.loadTrack()
    },
    prev () {
      this.current--
      this.loadTrack()
    },
    loadTrack () {
      this.setAttribute('src', `${this.tracks[this.current].stream_url}?client_id=739b39925c3cc275aeb03837ff27762c`)
    }
  }

  return assign(element, player)
}

export default getPlayer
