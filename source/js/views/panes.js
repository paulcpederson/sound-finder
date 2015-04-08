import events from 'pub-sub'
import $ from '$'

let $panes = $('[data-modal]')

events.on('pane', (n) => {
  // logic to set which pane and animate other panes
})
