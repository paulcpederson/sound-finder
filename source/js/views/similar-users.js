import view from '../../templates/users.dot'
import events from 'pub-sub'
import $ from '$'

let users = $('#users')[0]

events.on('users:updated', (data) => {
  users.innerHTML = view({users: data})
})
