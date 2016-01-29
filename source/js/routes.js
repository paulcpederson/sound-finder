import routeMatcher from 'route-matcher'
import events from 'pub-sub'


let match = routeMatcher.routeMatcher
let url = document.location.pathname + '/'
url = url.replace('//', '/')

let home = match('/').parse(url)
let user = match('/:username/').parse(url)
let play = match('/:username/play/').parse(url)

if (home) {
  console.log('show home page')
} else if (user) {
  console.log('matches user: ', user)
} else if (play) {
  console.log('play user: ', play)
} else {
  console.log('show 404')
}
