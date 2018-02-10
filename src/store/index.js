import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import auth from './modules/auth'
import locale from './modules/locale'
import activeCard from './modules/active-card'

Vue.use(Vuex)

const store = new Vuex.Store({
  // actions,
  modules: {
    auth,
    locale,
    activeCard
  }
})

export default store
