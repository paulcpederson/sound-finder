import events from 'pub-sub'
import $ from '$'

let $panes = $('[data-pane]')
let previous = 1

/**
 * Animate screens in and out by adding/removing classes
 * @param {Int} n Pane to navigate to
 */
events.on('pane', (n) => {
  $panes.forEach(el => {
    let pane = parseInt(el.getAttribute('data-pane'), 10)
    let $el = $(el)
    if (pane < n) {
      $el.addClass('move-out-left')
    } else if (pane > n) {
      $el.addClass('move-out-right')
    } else {
      if (previous < n) {
        $el.addClass('move-out-right').removeClass('move-out-left').removeClass('move-out-right')
      } else {
        $el.addClass('move-out-left').removeClass('move-out-right').removeClass('move-out-left')
      }
    }
  })
  previous = n
})
