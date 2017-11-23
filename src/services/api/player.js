import {
  request
} from './settings'
// import PubSub from 'pubsub-js'
export default {
  getPlayer (id) {
    return request({
      params: {
        call: 'Player/GetPlayer',
        request: {
          MundaneId: id
        }
      }
    })
  }
}
