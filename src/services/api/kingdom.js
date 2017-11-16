import {
  request
} from './settings'
import PubSub from 'pubsub-js'
export default {
  fetch () {
    return request({
      params: {
        call: 'Kingdom/GetKingdoms',
        request: ''
      }
    }).then((resp) => {
      if (resp.data.Kingdoms) {
        PubSub.publish('kingdoms.loaded', resp.data.Kingdoms)
      } else {
        PubSub.publish('alert.add', {
          key: 'nokingdoms',
          message: 'Error loading kingdoms',
          type: 'warning'
        })
      }
    })
  },
  detail (id) {
    return request({
      params: {
        request: {
          KingdomId: id
        },
        call: 'Kingdom/GetKindomDetails'
      }
    })
  }
}
