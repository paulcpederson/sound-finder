import events from 'pub-sub'
import $ from '$'

// trigger search on submit
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  events.emit('users:find', document.getElementById('username').value)
  events.emit('loader:show')
  events.emit('search:hide')
})

// toggle info screen
$('.info-toggle').on('click', () => {
  events.emit('info:toggle')
})

// back to search
$('.back').on('click', () => {
  events.emit('users:hide')
  events.emit('search:show')
})
