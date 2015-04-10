import playlist from '../services/playlist.js'
import player from '../services/player.js'
import events from 'pub-sub'
import $ from '$'

// Code to deal with play, pause, next
events.on('player:new', (id) => {
  playlist(id).then(tracks => {
    player.loadTrack(tracks[0])
  })
  .catch(err => console.log(err))
})
