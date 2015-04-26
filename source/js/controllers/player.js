import events from 'pub-sub'
import playlist from '../services/playlist.js'
import $ from '$'

var player = document.querySelector('#player')

// Code to deal with play, pause, next
events.on('player:new', (id) => {
  playlist(id).then(tracks => {
    player.setAttribute('src', `${tracks[0].stream_url}?client_id=739b39925c3cc275aeb03837ff27762c`)
    player.play()
  })
  .catch(err => console.log(err))
})

// visualizer code
// var audio = new (window.AudioContext || window.webkitAudioContext)
// var analyser = audio.createAnalyser()
// analyser.fftSize = 32
// let stream = new Uint8Array(analyser.frequencyBinCount)
// var source = audio.createMediaElementSource(player)

// function draw () {
//   requestAnimationFrame(draw)
//   analyser.getByteFrequencyData(stream)
//   //console.log(stream)
// }

// source.connect(analyser)
// analyser.connect(audio.destination)
// draw()
