/**
* Set the url and page title
* @param {String} title Title of page for new state
* @param {String} url   Url for new state
*/
function pushState (title, url) {
  let formattedTitle = `SoundFinder | ${title}`
  window.history.pushState({}, formattedTitle, url)
  document.title = formattedTitle
}

export default pushState

