import events from 'pub-sub'
import $ from '$'

let searchTerm = ''
let $input = document.querySelector('.js-search-input')

// trigger search on submit
$('.username-form').on('submit', (e) => {
  e.preventDefault()
  events.emit('users:find', $input.value)
  events.emit('pane', 2)
})

// back to search
$('.back').on('click', () => {
  events.emit('pane', 1)
})

$('.js-shape').on('mouseover', (e) => {
  $input.value = e.target.dataset.username
})

$('.js-shape').on('mouseout', (e) => {
  $input.value = searchTerm
})
