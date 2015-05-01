// Save items to local storage
import Emitter from 'tiny-emitter'

function get (KEY) {
  if (localStorage[KEY]) {
    return JSON.parse(localStorage[KEY])
  } else {
    return undefined
  }
}

function set (KEY, value) {
  localStorage[KEY] = JSON.stringify(value)
  return get(KEY)
}

function Store (ee, arg) {
  let KEY = this.KEY
  if (!arg) {
    return get(KEY)
  } else {
    if (typeof arg === 'function') {
      let newValue = arg(get(KEY))
      set(KEY, newValue)
    } else {
      set(KEY, arg)
    }
    ee.emit('changed', get(KEY))
    return get(KEY)
  }
}

function getStore (KEY) {
  let ee = new Emitter()
  let store = Store.bind({KEY}, ee)

  store.on = ee.on
  store.emit = ee.emit
  store.once = ee.once
  store.off = ee.off

  ee.on('changed', value => {
    store.emit('changed', value)
  })

  return store
}

export default getStore
