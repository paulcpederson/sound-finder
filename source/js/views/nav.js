import routeMatcher from 'route-matcher'
import events from 'pub-sub'
import $ from '$'

let navs = $('.js-nav')
let site = $('.js-nav-site')
let similar = $('.js-nav-similar')
let similarName = document.querySelector('.js-nav-similar-name')
let user = $('.js-nav-user')
let userName = document.querySelector('.js-nav-user-name')
let userWrap = document.querySelector('.js-user-wrap')

/**
 * Update the top nav when changing panes
 * @param {Int} n Pane to navigate to
 */
events.on('pane', (n) => {
  navs.addClass('hide')
  let name = userWrap.getAttribute('data-username')

  if (n > 1) {
    site.removeClass('hide')
  }

  if (name && n > 2) {
    similar.removeClass('hide')
    similarName.innerHTML = `similar to ${name}`
    similarName.setAttribute('href', `/${name}/`)
  }

  if (n > 3) {
    // parse user name from url
    let url = document.location.pathname + '/'
    url = url.replace('//', '/')
    let play = routeMatcher.routeMatcher('/:username/play/').parse(url)
    userName.innerHTML = play.username
    userName.setAttribute('href', `https://soundcloud.com/${play.username}/`)
    user.removeClass('hide')
  }
})
