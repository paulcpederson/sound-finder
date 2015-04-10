import view from '../../templates/users.dot'
import DiffDOM from 'diff-dom'
import events from 'pub-sub'
import $ from '$'

let users = $('#users')[0]
let dd = new DiffDOM()

events.on('users:updated', (data) => {
  let tmp = users.cloneNode(false)
  tmp.innerHTML = view({users: data})
  dd.apply(users, dd.diff(users, tmp))
})
