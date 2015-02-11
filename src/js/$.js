/**
* Create a new array like object of dom elements
*/
function Query() {
  /**
  * Add a class to selected elements
  * @param {String} className The class name to add
  */
  this.addClass = className => {
    this.forEach(e => e.classList.add(className))
    return this
  }
  /**
  * Remove a class from selected elements
  * @param {String} className The class name to remove
  */
  this.removeClass = className => {
    this.forEach(e => e.classList.remove(className))
    return this
  }
  /**
  * Toggle a class from selected elements
  * @param {String} className The class name to toggle
  */
  this.toggleClass = className => {
    this.forEach(e => e.classList.toggle(className))
    return this
  }
  /**
  * Attach an event listener with a callback to the selected elements
  * @param {String} event Name of event, eg. "click", "mouseover", etc...
  * @param {Function} callback The function to call when the event is triggered
  */
  this.on = (event, fn) => {
    this.forEach(e => e.addEventListener(event, fn, false))
    return this
  }
}

Query.prototype = Array.prototype

let $ = selector => {
  var collection = new Query();
  collection.push(...document.querySelectorAll(selector))
  return collection;
}

export default $