import events from 'pub-sub'
import $ from '$'

// trigger search on submit
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  events.trigger('users:find', document.getElementById('username').value)
  events.trigger('loader:show')
  events.trigger('search:hide')
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

