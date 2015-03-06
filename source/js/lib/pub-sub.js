/**
* Create an events hub
*/
import Events from 'ampersand-events'

// Create a new event bus
var events = Events.createEmitter()

// list all bound events for debugging
//events.on('all', () => console.log(events._events))

export default events