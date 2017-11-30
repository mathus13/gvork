import {
  request
} from './settings'

let config = {
}
export default {
  players (params) {
    params = Object.assign({
      call: 'SearchService/Player',
      limit: 300,
      search: '',
      type: 'all'
    }, params)
    config.params = params
    return request(config)
  },
  kingdoms (params) {
    params = Object.assign({
      Action: 'Search/Kingdom',
      limit: 300,
      name: ''
    }, params)
    config.params = params
    return request(config)
  },
  parks (params) {
    params = Object.assign({
      Action: 'Search/Park',
      limit: 300,
      name: ''
    }, params)
    config.params = params
    return request(config)
  }
}
