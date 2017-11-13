import Axios from 'axios'
import PubSub from 'pubsub-js'
let baseurl = 'https://amtgard.com/ork/orkservice/'
export const apiurl = baseurl + 'Json/index.php'
export const searchurl = baseurl + 'Search/SearchService.php'
export let request = function (config) {
  return Axios(config).catch((error) => {
    if (error.response.status === 401) {
      PubSub.publish('session.end')
      PubSub.publish('session.alert', {
        type: 'danger',
        message: 'You have been logged out. Please log in again.'
      })
    }
  })
}
