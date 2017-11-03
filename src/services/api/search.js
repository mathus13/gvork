import {
  searchurl,
  request
} from './settings'

export default {
  players (params) {
    params = Object.assign({
      call: 'Search/Player',
      limit: 300,
      search: '',
      type: 'all'
    }, params)
    return request('get', searchurl, params)
  },
  kingdoms (params) {
    params = Object.assign({
      call: 'Search/Kingdom',
      limit: 300,
      name: ''
    }, params)
    return request('get', searchurl, params)
  },
  parks (params) {
    params = Object.assign({
      call: 'Search/Kingdom',
      limit: 300,
      name: ''
    }, params)
    return request('get', searchurl, params)
  }
}
