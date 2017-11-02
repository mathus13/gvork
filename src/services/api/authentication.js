import {
  apiurl,
  request
} from './settings'
import PubSub from 'pubsub-js'
export default {
  login (user, pass) {
    request('get', apiurl, {
      call: 'Authorization/Authorize',
      request: {
        UserName: user,
        Password: pass
      }
    }).then((resp) => {
      if (resp.data.Status.Error === 'Success') {
        PubSub.publish('session.authenticated', {
          token: resp.data.Token,
          id: resp.data.UserId,
          timeout: resp.data.Timeout
        })
      }
    })
  }
}
