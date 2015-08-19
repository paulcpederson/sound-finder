import view from '../../templates/users.dot'
import events from 'pub-sub'
import $ from '$'

let $users = $('#users')[0]

events.on('users:updated', (data) => {
  let users = data.map(user => {
    user.avatar_url = user.avatar_url.replace('-large', '-t500x500')
    if (user.avatar_url.includes('default_avatar_large.png')) {
      user.avatar_url = `https://sigil.cupcake.io/${user.username}?w=600`
    }
    return user
  })
  $users.innerHTML = view({users})
})
