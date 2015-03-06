import events from 'pub-sub'
import $ from '$'

let view = () => {
  events.on('info:toggle', () => {
    $('.info').toggleClass('is-active')
  })
}

export default view()