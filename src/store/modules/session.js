import auth from '../../services/api/authentication'
import PubSub from 'pubsub-js'

const state = {
  token: null,
  user: {},
  timeout: null
}

const getters = {
  getUserPersona () {
    return (state.user.Persona) ? state.user.Persona : ''
  },
  getUserFullName () {
    return `${state.user.GivenName} ${state.user.Surname}`
  },
  getUser () {
    return state.user
  }
}

const actions = {
  authenticate ({
    commit,
    state
  }, data) {
    return auth.login(data.user, data.pass).then((resp) => {
      commit('SET_USER', {
        UserId: resp.data.UserId
      })
      commit('SET_TOKEN', resp.data.Token)
      commit('SET_TIMEOUT', resp.data.Timeout)
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_TIMEOUT (state, time) {
    state.timeout = time
  }
}

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}

PubSub.subscribe('session.authenticated', (payload) => {
  mutations.SET_USER(state, payload.user)
})
