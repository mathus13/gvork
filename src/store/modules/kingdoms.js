import Kingdoms from '@/services/api/kingdom'
import PubSub from 'pubsub-js'
import Collection from 'lodash/collection'

const state = {
  kingdoms: []
}

const getters = {
  getKingdoms () {
    return state.kingdoms
  },
  getKingdomById (id) {
    return Collection.find(state.kingdoms, {KingdomId: id})
  },
  getKingdomByName (name) {
    return Collection.filter(state.kingdoms, function (o) {
      return (o.KingdomName && o.KingdomName.indexOf(name) !== -1)
    })
  }
}

const actions = {
  getKingdoms (context) {
    let local = localStorage.getItem('kingdoms')
    if (local && local.length > 0) {
      console.log('Using saved kingdom list')
      context.commit('SET_KINGDOMS', JSON.parse(local))
      return
    }
    Kingdoms.fetch().then((resp) => {
      if (resp.data.Kingdoms) {
        context.commit('SET_KINGDOMS', resp.data.Kingdoms)
      } else {
        PubSub.publish('alerts.add', {
          key: 'nokingdoms',
          type: 'warning',
          timestamp: Date.parse(),
          message: 'Trouble loading Kingdoms'
        })
      }
    })
  }
}

const mutations = {
  SET_KINGDOMS (state, kingdoms) {
    localStorage.setItem('kingdoms', JSON.stringify(kingdoms))
    state.kingdoms = kingdoms
  }
}

export default {
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations
}
