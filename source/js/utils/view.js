import * as templates from './templates.js'

function createView (name) {
  let view = {
    el: `[data-view="${name}"]`,
    render: (data) => templates[name].render(data)
  }
  return view
}

export default createView
