/**
 * Manage progress bar and status messages
 */

import $ from './$'

let loader = $('.loader')
let text = $('.messages')

/**
 * Update loader and status message
 * @param {Integer} percentage Percent (of 100) progress
 * @param {String} message Status message
 * @returns {Sting} type One of 'info' or 'error'
 */
let notify = (percentage = 0, message = '', type = 'info') => {
  loader.textContent = message
  loader.addClass(`p${percentage}`)
}

export default notify;