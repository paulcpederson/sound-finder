import soundCloud from 'sound-cloud'
import mess from 'mess'

/**
 * Assemble a suffled playlist out of a users likes
 * @param {Int} id ID of the user
 * @returns {Promise} Resolved with an array of trackIds
 */
let playlist = (id) => {
  return new Promise((resolve, reject) => {
    soundCloud.favorites(id).then(favs => {
      console.log(favs)
      resolve(favs)
    }).catch(err => reject(err))
  })
}

export default playlist
