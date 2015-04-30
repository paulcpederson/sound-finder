// models/player.js
import controller from '../controllers/player.js'
import Emitter from 'tiny-emitter'
import Store from '../lib/store.js'
import playlist from '../services/playlist.js'

let store = Store('player')

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
  store(s => {
    s.current++
    return s
  })
})

controller.on('prev', () => {
  store(s => {
    s.current--
    return s
  })
})

controller.on('play', () => {
  store(s => {
    s.playing = !s.playing
    return s
  })
})

export default store
