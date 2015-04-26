import events from 'pub-sub'

function draw(analyser, data) {
  requestAnimationFrame(() => draw(analyser, data))
  analyser.getByteFrequencyData(data)
  //console.log(data)
}

events.on('visualize', draw)
