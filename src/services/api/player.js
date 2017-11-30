import {
  request
} from './settings'
// import PubSub from 'pubsub-js'
export default {
  getPlayer (player, token) {
    let id = (typeof player === 'object') ? player.MundaneId : player
    return request({
      params: {
        call: 'Player/GetPlayer',
        request: {
          MundaneId: id,
          Token: token
        }
      }
    })
  },
  getAwards (player, token) {
    return request({
      params: {
        call: 'Player/AwardsForPlayer',
        request: {
          MundaneId: player.MundaneId,
          Token: token
        }
      }
    })
  },
  getClasses (player, token) {
    return request({
      params: {
        call: 'Player/GetPlayerClasses',
        request: {
          MundaneId: player.MundaneId,
          Token: token
        }
      }
    })
  },
  addUser (player, token) {
    let params = Object.assign({ Token: token }, player)
    return request({
      params: {
        call: 'Player/CreatePlayer',
        request: params
      }
    })
  }
}
