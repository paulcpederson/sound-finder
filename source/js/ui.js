import $ from './utils/$.js'
import state from './state.js'
import diffDOM from 'diff-dom'
import infoView from './views/info.js'
import loaderView from './views/loader.js'
import playerView from './views/player.js'
import searchView from './views/search.js'
import usersView from './views/similar-users.js'

let body = $('body')[0]
let tmp = body.cloneNode(true)
let dd = new diffDOM()
let views = [infoView, loaderView, playerView, searchView, usersView]

let render = () => {
  state((s) => {
    // update html with current state
    views.forEach(view => {
      tmp.querySelector(view.el).innerHTML(view.render(s))
    })
    dd.apply(body, dd.diff(body, tmp))
  })
}

export default render()
