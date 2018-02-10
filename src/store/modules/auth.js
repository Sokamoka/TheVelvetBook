import axios from 'axios'
import moment from 'moment'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ON_ERROR = 'ON_ERROR'
const USER = 'USER'

export default ({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    pending: false,
    token: localStorage.getItem('token'),
    authUser: JSON.parse(localStorage.getItem('auth_user')) || {}
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isAuthenticated: state => {
      let expiration = localStorage.getItem('expiration')
      // console.log('Expiration:', moment((expiration)).format('YYYY-MM-DD HH:mm:ss'))
      if (expiration && moment().isAfter(expiration)) {
        // console.log('isAfter')
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        state.isLoggedIn = false
      } else {
        localStorage.setItem('expiration', moment().add(20, 'm').toISOString())
      }
      return state.isLoggedIn
    },
    getToken: state => {
      return state.token
    },
    getUser: state => {
      return state.authUser
    }
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state, token) {
      state.isLoggedIn = true
      state.pending = false
      state.token = localStorage.getItem('token')
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.token = null
    },
    [ON_ERROR] (state) {
      state.isLoggedIn = false
      state.pending = false
    },
    [USER] (state, data) {
      state.authUser = data
    }
  },
  actions: {
    login ({state, commit, rootState, dispatch}, data) {
      // console.log('login...', data)
      commit(LOGIN) // show spinner
      return new Promise((resolve, reject) => {
        axios.post('oauth/token', data)
          .then(response => {
            // console.log(response)
            // console.log('exp:', moment(response.data.expires_in), new Date(response.data.expires_in).toString())
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('expiration', moment().add(20, 'm').toISOString())
            commit(LOGIN_SUCCESS, response.data.access_token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
            resolve()
            dispatch('getUser')
          })
          .catch(error => {
            // console.log('ON_ERROR:', error)
            commit(ON_ERROR)
            reject(error.response.data)
          })
      })
    },
    logout ({commit}) {
      return new Promise(resolve => {
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        localStorage.removeItem('auth_user')
        commit(LOGOUT)
        resolve()
      })
    },
    getUser ({commit}) {
      axios.get('api/user')
        .then(response => {
          // console.log(response)
          localStorage.setItem('auth_user', JSON.stringify(response.data))
          commit(USER, response.data)
        })
    },
    updateExpiration () {
      localStorage.setItem('expiration', moment().add(20, 'm').toISOString())
    }
  }
})
