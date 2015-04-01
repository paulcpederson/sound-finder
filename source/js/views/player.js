import playlist from '../services/playlist.js'
import player from '../player.js'
import events from 'pub-sub'
import $ from '$'

events.on('player:new', (id) => {
  playlist(id).then(tracks => {
    player.loadTrack(tracks[0])
  })
  .catch(err => console.log(err))
})
