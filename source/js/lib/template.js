/**
* Factory function for templates
* @param {Object} template DOM Node which contains the template
* @return Function
*/
function getTemplate (template) {
  return replaceInfo.bind({template})
}

/**
* Replace {{key}} with the actual key from the object
* @param {Object} obj Object containing data for the template
* @return DOMNode
*/
function replaceInfo (obj) {
  let template = this.template.outerHTML
  Object.keys(obj).forEach(key => {
    let re = new RegExp(`{{${key}}}`, 'g')
    template = template.replace(re, obj[key])
  })
  var tmp = document.createElement('div')
  tmp.innerHTML = template
  return tmp.firstChild
}

export default getTemplate
