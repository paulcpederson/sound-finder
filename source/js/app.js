/**
* Polyfills
*/
import polyfill from 'array.from'

/**
* Import Views
*/
import panesView from './views/panes.js'
import loaderView from './views/loader.js'
import playerView from './views/player.js'
import usersView from './views/similar-users.js'
import infoView from './views/info.js'
import visualizer from './views/visualizer.js'

/**
* Import Controllers
*/
import infoController from './controllers/info.js'
import loaderController from './controllers/loader.js'
import searchController from './controllers/search.js'
import playerController from './controllers/player.js'
import usersController from './controllers/similar-users.js'

/**
* Parse URL
*/
import router from './routes.js'
router()
window.addEventListener('popstate', router)
