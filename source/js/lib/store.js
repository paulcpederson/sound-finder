// Save items to local storage
// Surface add, remove, update, and delete
import Emitter from 'tiny-emitter'
import guid from '../lib/guid.js'
import extend from 'util-extend'

function get (KEY) {
  return JSON.parse(localStorage[KEY])
}

function set (KEY, value) {
  localStorage[KEY] = JSON.stringify(value)
  return get(KEY)
}

function store (arg) {
  if (!arg) {
    return get(this.KEY)
  } else {
    if (typeof arg === 'function') {
      let copy = get(this.KEY)
      let newValue = arg(copy)
      set(newValue)
    } else {
      set(arg)
    }
    this.emit('changed', get(this.KEY))
  }
}

function getStore (KEY) {
  let Store = extend(store, new Emitter())
  Store.key = KEY
  return Store
}

export default setStore
