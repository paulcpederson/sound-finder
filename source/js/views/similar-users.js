import model from 'models/similar-users'
import * as templates from 'templates'
import diffDOM from 'diff-dom'
import events from 'pub-sub'
import $ from '$'

let users = $('#users')[0]
let $wrap = $('.user-wrap')
let dd = new diffDOM()

events.on('users:updated', () => {
  let tmp = users.cloneNode(false)
  tmp.innerHTML = templates.users.render({users: model()})
  dd.apply(users, dd.diff(users, tmp))
})

events.on('users:show', () => {
  $wrap.removeClass('move-out-right')
})

events.on('users:hide', () => {
  $wrap.addClass('move-out-right')
})
