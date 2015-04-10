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
    let pane = parseInt(el.dataset.pane, 10)
    let $el = $(el)
    if (pane < n) {
      // slide pane off left
      $el.addClass('move-out-left')
    } else if (pane > n) {
      // slide pane off to the right
      $el.addClass('move-out-right')
    } else {
      // make this the active pane
      if (previous < n) {
        // animate in from right
        $el.addClass('move-out-right').removeClass('move-out-left').removeClass('move-out-right')
      } else {
        // animate in from left
        $el.addClass('move-out-left').removeClass('move-out-right').removeClass('move-out-left')
      }
    }
  })
  previous = n
})
