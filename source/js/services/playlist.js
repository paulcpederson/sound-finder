import sc from 'sound-cloud'
import mess from 'mess'

/**
 * Assemble a shuffled playlist out of a users likes
 * @param {Int} id ID of the user
 * @returns {Promise} Resolved with an array of trackIds
 */
let playlist = (id) => {
  return new Promise((resolve, reject) => {
    sc.favorites(id).then(favs => {
      favs = favs.filter(fav => fav.streamable)
      resolve(mess(favs))
    }).catch(err => reject(err))
  })
}

export default playlist
