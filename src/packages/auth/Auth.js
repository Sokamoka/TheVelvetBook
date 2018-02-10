import store from '../../store/'
import moment from 'moment'

export default function (Vue) {
  Vue.auth = {
    setToken (token, expiration) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },
    getToken () {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if (!token || !expiration) {
        return null
      }
      console.log('Date.now():', moment().format('YYYY-MM-DD HH:mm:ss'), '//', moment(parseInt(expiration)).format('YYYY-MM-DD HH:mm:ss'))
      if (Date.now() > parseInt(expiration)) {
        this.destroyToken()
        return null
      } else {
        return token
      }
    },
    destroyToken () {
      localStorage.removeItem('token')
      localStorage.removeItem('expiration')
      store.state.isAuth = false
    },
    isAuthenticated () {
      if (this.getToken()) {
        store.state.isAuth = true
        return true
      } else {
        store.state.isAuth = false
        return false
      }
    },
    setAuthenticatedUser (data) {
        //
    },
    getAuthenticatedUser () {
        //
    }

  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return Vue.auth
      }
    }
  })
}
