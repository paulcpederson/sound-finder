import events from 'pub-sub'
import $ from '$'

let navs = $('.js-nav')
let site = $('.js-nav-site')
let similar = $('.js-nav-similar')
let similarName = $('.js-nav-similar-name')
let user = $('.js-nav-user')
let userName = $('.js-nav-user-name')

/**
 * Update the top nav when changing panes
 * @param {Int} n Pane to navigate to
 */
events.on('pane', (n) => {
  navs.addClass('hidden')
  if (n > 1) {
    site.removeClass('hidden')
  }
  if (n > 2) {
    similar.removeClass('hidden')
    // set text of similarName to current similar search
  }
  if (n > 3) {
    user.removeClass('hidden')
    // set text of user to currently playing
  }
})
