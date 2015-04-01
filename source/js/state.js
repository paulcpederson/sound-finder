import observable from 'observable'

let firstState = {
  info: false,
  screen: 0,
  searchTerm: '',
  loading: false,
  loader: {
    percentage: 0,
    message: '',
    type: 'info'
  }
  playlist: []
}

export default observable(firstState)
