import * as templates from 'templates'
import diffDOM from 'diff-dom'
import events from 'pub-sub'
import $ from '$'

let view = () => {
  let $users = $('#users')
  let dd = new diffDOM()

  events.on('users:update', (data) => {
    let tmp = $users[0].cloneNode(false)
    tmp.innerHTML = templates.users.render({users: data})
    dd.apply($users, dd.diff($users, tmp))
  })

  events.on('users:show', () => {
    $users.removeClass('move-out-right').addClass('ready')
  })

  events.on('users:hide', () => {
    $users.addClass('move-out-right')
  })
}

export default view()
