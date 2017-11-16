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
    auth.login(data.user, data.pass)
    PubSub.subscribe('session.authenticated', (topic, payload) => {
      console.log(payload)
      commit('SET_USER', payload.user)
      commit('SET_TOKEN', payload.token)
      commit('SET_TIMEOUT', payload.timeout)
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    console.log(state, user)
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
