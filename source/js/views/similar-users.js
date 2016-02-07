import events from 'pub-sub'
import Template from '../lib/template'

let $users = document.querySelector('.js-user-wrap')
let template = Template(document.querySelector('.js-similar-user-template'))

function defaults (user) {
  user.avatar_url = user.avatar_url.replace('-large', '-t500x500')
  if (user.avatar_url.includes('default_avatar_large.png')) {
    user.avatar_url = `https://sigil.cupcake.io/${user.username}?w=600`
  }
  user.city = user.city || 'Earth'
  user.full_name = user.full_name || user.username
  return user
}

function append (node) {
  $users.appendChild(node)
}

events.on('users:updated', (data, username) => {
  document.querySelector('.js-user-wrap').setAttribute('data-username', username)
  data.map(defaults).map(template).forEach(append)
})
