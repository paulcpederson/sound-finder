import events from 'pub-sub'
import playlist from '../services/playlist.js'
import $ from '$'

let player = document.querySelector('#player')

function getPlayer (tracks) {
  let context = new (window.AudioContext || window.webkitAudioContext)
  let source = context.createMediaElementSource(player)
  let analyser = context.createAnalyser()
  analyser.fftSize = 32
  let dataStream = new Uint8Array(analyser.frequencyBinCount)

  source.connect(analyser)
  analyser.connect(context.destination)

  player.setAttribute('src', `${tracks[0].stream_url}?client_id=739b39925c3cc275aeb03837ff27762c`)
  events.emit('play', analyser, dataStream)
}

// Code to deal with play, pause, next
events.on('player:new', (id) => {
  playlist(id).then(getPlayer)
  .catch(err => console.log(err))
})

// $('.info-toggle').on('click', _ => {
//   events.emit('info:toggle')
// })

