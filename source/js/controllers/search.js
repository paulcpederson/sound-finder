import events from 'pub-sub'
import $ from '$'

let searchTerm = ''
let input = document.querySelector('.js-search-input')

function changeInputColor (newColor) {
  $(input).removeClass('text-green')
  .removeClass('text-yellow')
  .removeClass('text-red')
  .removeClass('text-blue')
  .addClass(`text-${newColor}`)
}

// trigger search on submit
$('.js-search-form').on('submit', (e) => {
  e.preventDefault()
  events.emit('users:find', $input.value)
  events.emit('pane', 2)
})

// back to search
$('.back').on('click', () => {
  events.emit('pane', 1)
})

$(input).on('keyup', (e) => {
  searchTerm = input.value
})

$('.js-shape').on('mouseover', (e) => {
  input.value = e.target.dataset.username
  changeInputColor(`${e.target.dataset.color}`)
})

$('.js-shape').on('mouseout', (e) => {
  changeInputColor('green')
  input.value = searchTerm
})

$('.js-shape').on('click', (e) => {
  e.preventDefault()
  document.querySelector('.js-search-submit').click()
})
