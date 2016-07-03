/**
 * Wrapper for soundcloud api
 */
import rq from './rq.js'

/**
 * Sets up a new sound cloud client
 * @param {String} clientId Your soundcloud app id
 * @returns {Object} Object with methods for necessary routes
 */
let client = clientId => {
  let sc = {
    /* Automatically add client id, base url */
    request: (url, form = {}) => {
      form.client_id = clientId
      return rq.get(`http://api.soundcloud.com/${url}`, form)
    },
    /* Get user id from username */
    userID: username => {
      return sc.request('resolve', {
        url: `http://soundcloud.com/${username}`,
        '_status_code_map[302]': 200
      })
      .then(response => rq.get(response.location))
    },
    /* Get favorite tracks from user id */
    favorites: (userID, limit = 100) => sc.request(`users/${userID}/favorites`, {limit}),
    /* Get users who favorited a track by track id */
    trackFavorites: trackID => sc.request(`tracks/${trackID}/favoriters`)
  }
  return sc
}

export default client('739b39925c3cc275aeb03837ff27762c')
