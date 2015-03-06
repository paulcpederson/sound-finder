import similarUsers from 'similar-users'
import events from 'pub-sub'
import $ from '$'

// trigger search on submit
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  events.trigger('search', document.getElementById('username').value)
})

// find new users
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  let username = document.getElementById('username').value
  similarUsers(username).then(response => {
    events.trigger('users:update', response)
    events.trigger('users:show')
    events.trigger('search:hide')
  }).catch(err => console.log(err))
})

// toggle info screen
$('.info-toggle').on('click', () => {
  events.trigger('info:toggle')
})

// back to search
$('.back').on('click', () => {
  events.trigger('users:hide')
  events.trigger('search:show')
})

