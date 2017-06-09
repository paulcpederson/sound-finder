/**
* Polyfills
*/
import 'array.from'
import promise from 'es6-promise'
promise.polyfill()

/**
* Import Views
*/
import panesView from './views/panes'
import navView from './views/nav'
import loaderView from './views/loader'
import playerView from './views/player'
import usersView from './views/similar-users'
import infoView from './views/info'
import visualizer from './views/visualizer'

/**
* Import Controllers
*/
import navController from './controllers/nav'
import infoController from './controllers/info'
import loaderController from './controllers/loader'
import searchController from './controllers/search'
import playerController from './controllers/player'
import usersController from './controllers/similar-users'

/**
* Parse URL
*/
import router from './routes'
router()
window.addEventListener('popstate', router)
