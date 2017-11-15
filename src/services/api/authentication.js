import {
  apiurl,
  request
} from './settings'
import PubSub from 'pubsub-js'
export default {
  login (user, pass) {
    return request({
      method: 'get',
      url: apiurl,
      params: {
        call: 'Authorization/Authorize',
        'request[UserName]': user,
        'request[Password]': pass
      }
    }).then((resp) => {
      if (resp.data.Status.Error === 'Success') {
        let token = resp.data.Token
        let user = { UserId: resp.data.UserId }
        let timeout = resp.data.Timeout
        request({
          method: 'get',
          url: apiurl,
          params: {
            call: 'Player/GetPlayer',
            'request[MundaneId]': user.id
          }
        }).then((resp) => {
          console.log(resp)
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
