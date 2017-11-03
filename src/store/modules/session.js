import auth from '../../services/api/authentication'

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
    auth.login(data.user, data.pass).then((resp) => {
      commit('SET_USER', {
        UserId: resp.data.UserId
      })
      commit('SET_TOKEN', resp.data.Token)
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}
