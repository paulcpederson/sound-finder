import sc from 'sound-cloud'
import flatten from 'array-flatten'

/**
 * Rank a set of users on how many shared favorites they have
 * @param {Array} favoriters Array of users (contains duplicates)
 * @param {Sting} username   Original username from search
 * @returns {Array} 30 most similar users
 */
function rank (favoriters, username) {
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
    .filter(id => users[id].permalink !== username) // remove the original user
    .slice(0, 28)
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
  let loaded = 0

  // emit loader events after fetching each user
  function eachUser (favoriters) {
    return favoriters.then(favoriters => {
      let usersWithCity = favoriters.filter(user => user.city)
      var randomUser = usersWithCity[Math.floor(Math.random() * usersWithCity.length)]
      loaded++
      ee.emit('data', loaded, `<small>finding users from</small><br>${randomUser.city}`)
      return favoriters
    }).catch(err => console.error(err))
  }

  ee.emit('data', loaded, `<small>finding user</small><br> ${username}`)

  sc.userID(username)

  .catch(() => ee.emit('error', 'Error finding username. Try again, butterfingers...'))

  .then(user => {
    loaded += 10
    ee.emit('data', loaded, `<small>getting favorites for</small><br> ${username}`)
    return sc.favorites(user.id)
  })

  .then(favorites => {
    let allfavs = favorites.map(f => f.id).map(sc.trackFavorites)
    return Promise.all(allfavs.map(eachUser))
  })

  .then(favoriters => {
    ee.emit('data', 100, `<small>almost done</small><br>ranking users on similarity`)
    return rank(favoriters, username, ee)
  })

  .then(favoriters => ee.emit('done', favoriters, username))

  .catch(err => {
    console.error(err.stack)
    ee.emit('error', 'error fetching similar users')
  })
}

export default getFriends
