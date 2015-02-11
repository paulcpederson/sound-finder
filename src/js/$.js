class Query {
  /**
  * Create a new array like object of elements
  * @constructor
  */
  constructor(selector) {
    var elements = document.querySelectorAll(selector)
    this.length = elements.length
    Object.assign(this, elements)
  }

  /**
  * Apply function to  collection, return collection
  * @param {Function} callback Callback function to call on every element
  */
  each(callback) {
    for (let el of Array.from(this)) {
      callback.call(el)
    }
    return this
  }

  /**
  * Add a class to selected elements
  * @param {String} className The class name to add
  */
  addClass(className) {
    return this.each(function() {
      this.classList.add(className)
    })
  }

  /**
  * Remove a class from selected elements
  * @param {String} className The class name to remove
  */
  removeClass(className) {
    return this.each(function() {
      this.classList.remove(className)
    })
  }

  /**
  * Toggle a class from selected elements
  * @param {String} className The class name to toggle
  */
  toggleClass(className) {
    return this.each(function() {
      this.classList.toggle(className)
    })
  }

  /**
  * Attach an event listener with a callback to the selected elements
  * @param {String} event Name of event, eg. "click", "mouseover", etc...
  * @param {Function} callback The function to call when the event is triggered
  */
  on(event, fn) {
    return this.each(function() {
      this.addEventListener(event, fn, false)
    })
  }

}

var $ = selector => new Query(selector)

export default $