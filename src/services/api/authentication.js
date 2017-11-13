import {
  apiurl,
  request
} from './settings'
import PubSub from 'pubsub-js'
export default {
  login (user, pass) {
    request({
      method: 'get',
      url: apiurl,
      params: {
        call: 'Authorization/Authorize',
        request: {
          UserName: user,
          Password: pass
        }
      }
    }).then((resp) => {
      if (resp.data.Status.Error === 'Success') {
        let token = resp.data.Token
        let user = { UserId: resp.data.UserId }
        let timeout = resp.data.Timeout
        request('get', apiurl, {
          call: 'Player/GetPlayer',
          request: {
            MundaneId: user.id
          }
        }).then((resp) => {
          user = Object.assign(resp.data.Player, user)
          PubSub.publish('session.authenticated', {
            token: token,
            user: user,
            timeout: timeout
          })
        })
      }
    })
  }
}
