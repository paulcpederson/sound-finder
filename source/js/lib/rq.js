/**
 * Simple request module
 */
let rq = {
  /**
   * Builds a URI-encoded query string from an object
   * @param {Object} form Formatted `{field: value}`
   * @returns {String} Concatenated and URI endoded string of paramenters
   */
  encodeForm: (form = {}) => {
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=')
    }).join('&')
  },
  /**
   * Simple GET request to url, returns a promise
   * @param {String} url
   * @param {Object} form Form data appended to url as form encoded query strings
   * @returns {Promise} Response body (parsed as JSON if application/json content-type detected)
   */
  get: (url, form) => {
    return new Promise((resolve, reject) => {
      var xhr = new window.XMLHttpRequest()
      form = rq.encodeForm(form)
      let formattedUrl = form.length ? `${url}?${form}` : url
      xhr.open('get', formattedUrl, true)
      xhr.responseType = 'json'
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.response)
        } else {
          reject(new Error(xhr.status))
        }
      }
      xhr.onerror = () => reject(new Error('XMLHttpRequest Error: ' + xhr.statusText))
      xhr.send()
    })
  }
}

export default rq
