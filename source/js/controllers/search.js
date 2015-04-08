import events from 'pub-sub'
import $ from '$'

// trigger search on submit
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  events.emit('users:find', document.getElementById('username').value)
  events.emit('pane', 2)
})

// back to search
$('.back').on('click', () => {
  events.emit('pane', 1)
})
