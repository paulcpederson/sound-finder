import sc from 'sound-cloud'
import flatten from 'array-flatten'
import events from 'pub-sub'

// suppress errors in optional calls
let suppress = x => x.catch(function (err) { console.log(err) })

/**
 * Get Soundcloud users that are like another user
 * @param {String} username Username of the user you'd like to research
 * @returns {Promise} Resolved with an array of similar user objects
 */
let getFriends = (username) => {
  return new Promise((resolve, reject) => {
    // get userid from username
    sc.userID(username)
    .catch(err => {
      events.trigger('loader:update', {message: 'Error finding username. Try again, butterfingers...', type: 'error'})
      reject(err)
    })
    // get last 50 favorite tracks
    .then(user => {
      events.trigger('loader:update', {percentage: 10, message: `fetching ${username}'s favorites`})
      return sc.favorites(user.id)
    })
    // get all the people who favorited those tracks
    .then(favorites => {
      let allfavs = favorites.map(f => f.id).map(sc.trackFavorites)
      events.trigger('loader:update', {percentage: 40, message: `finding other users, hang tight...`})
      return Promise.all(allfavs.map(suppress))
    })
    // assemble an array
    .then(favoriters => {

      events.trigger('loader:update',{percentage: 80 , message: `comparing ${username} to other users`})

      // flatten all of the favoriters into one array
      favoriters = flatten(favoriters).filter(f => f !== undefined)

      // create a hash of all user ids
      let users = {}
      let hash = favoriters.map(f => f.id)

      // iterate over all ids, incrementing similarity
      hash.forEach((id, i) => {
        if (users[id]) {
          users[id].similarity += 1
        } else {
          users[id] = favoriters[i]
          users[id].similarity = 1
        }
      })

      events.trigger('loader:update', {percentage: 90, message: 'ranking users based on similarity'})

      let similarUsers = []
      let keys = Object.keys(users)
      .sort((a,b) => users[b].similarity - users[a].similarity)
      .slice(0, 30)
      .forEach((key) => {
        similarUsers.push(users[key])
      })

      events.trigger('loader:update', {percentage: 100, message: 'complete'})

      resolve(similarUsers)
    })
    .catch(err => {
      events.trigger('loader:update', {message: 'error fetching similar users', type: 'error'})
      reject(err)
    })
  })
}

export default getFriends
