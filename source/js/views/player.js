import playlist from '../services/playlist.js'
import player from '../player.js'
import events from 'pub-sub'
import $ from '$'

events.on('player:new', (id) => {
  //console.log(id)
  playlist(id).then(tracks => {
    //console.log(tracks)
    return player.loadTrack(tracks[0])
  })
  .catch(err => console.log(err))
  .then(sound => {
    console.log(sound)
  })
  .catch(err => console.log(err))
})
