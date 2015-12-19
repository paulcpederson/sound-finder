import events from 'pub-sub'
import $ from '$'

let searchTerm = ''
let searchInput = document.querySelector('.js-search-input')

function changeInputColor (newColor) {
  $(searchInput).removeClass('text-green')
  .removeClass('text-yellow')
  .removeClass('text-red')
  .removeClass('text-blue')
  .addClass(`text-${newColor}`)
}

// trigger search on submit
$('.js-search-form').on('submit', (e) => {
  e.preventDefault()
  events.emit('users:find', searchInput.value)
  events.emit('pane', 2)
})

// back to search
$('.back').on('click', () => {
  events.emit('pane', 1)
})

$(searchInput).on('keyup', (e) => {
  searchTerm = input.value
})

$('.js-shape').on('mouseover', (e) => {
  searchInput.value = e.target.dataset.username
  changeInputColor(`${e.target.dataset.color}`)
})

$('.js-shape').on('mouseout', (e) => {
  changeInputColor('green')
  searchInput.value = searchTerm
})

$('.js-shape').on('click', (e) => {
  e.preventDefault()
  document.querySelector('.js-search-submit').click()
})
