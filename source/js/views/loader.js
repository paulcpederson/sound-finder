import events from 'pub-sub'
import $ from '$'

let view = () => {

  let $loader = $('.loader')
  let $text = $('.loading-message')

  events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
    if (type == 'error') {
      $loader.addClass(`p100`).addClass('error')
    } else {
      $loader.addClass(`p${percentage}`)
    }
    $text[0].textContent = message
  })

  events.on('loader:show', () => {
    // fade in the loader
    $loader.removeClass('fade-out')
  })

  events.on('loader:hide', () => {
    // fade out the loader
    $loader.addClass('fade-out')
  })
}

export default view()