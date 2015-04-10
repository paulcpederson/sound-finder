import sc from 'sound-cloud'
import flatten from 'array-flatten'

// suppress errors in optional calls
let suppress = x => x.catch(err => console.log(err))

/**
 * Rank a set of users on how many shared favorites they have
 * @param {Array} favoriters Array of users (contains duplicates)
 * @returns {Array} 30 most similar users
 */
function rank (favoriters) {
  favoriters = flatten(favoriters).filter(f => f)

  let users = {}
  let ids = favoriters.map(f => f.id)

  ids.forEach((id, i) => {
    if (users[id]) {
      users[id].similarity += 1
    } else {
      users[id] = favoriters[i]
      users[id].similarity = 1
    }
  })

  let rankedUsers = Object.keys(users)
  .sort((a, b) => users[b].similarity - users[a].similarity)
  .slice(0, 30)
  .map(key => users[key])

  return rankedUsers
}

/**
 * Get Soundcloud users that are like another user
 * @param {String} username Username of the user you'd like to research
 * @param {Object} ee EventEmitter
 * @returns {Promise} Resolved with an array of similar user objects
 */
let getFriends = (username, ee) => {
  sc.userID(username)

  .catch(() => ee.emit('error', 'Error finding username. Try again, butterfingers...'))

  .then(user => {
    ee.emit('data', 10, `fetching ${username}'s favorites`)
    return sc.favorites(user.id)
  })

  .then(favorites => {
    let allfavs = favorites.map(f => f.id).map(sc.trackFavorites)
    ee.emit('data', 40, 'finding other users, hang tight...')
    return Promise.all(allfavs.map(suppress))
  })

  .then(favoriters => ee.emit('done', rank(favoriters)))

  .catch(() => ee.emit('error', 'error fetching similar users'))
}

export default getFriends
