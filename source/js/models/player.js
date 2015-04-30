// models/player.js
import controller from '../controllers/player.js'
import Emitter from 'tiny-emitter'
import Store from '../lib/store.js'
import playlist from '../services/playlist.js'

let store = Store('player')
let ee = new Emitter()

controller.on('new', id => {
  playlist(id).then(tracks => {
    store({
      current: 0,
      playing: true,
      tracks: tracks
    })
  })
  .catch(err => console.log(err))
})

controller.on('next', () => {
  store(s => s.current++)
})

controller.on('prev', () => {
  store(s => s.current--)
})

controller.on('play', () => {
  store(s => s.playing = !s.playing)
})

store.on('changed', store => ee.emit('changed', store))

export default ee

