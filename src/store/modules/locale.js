import Vue from 'vue'
import { Validator } from 'vee-validate'
import moment from 'moment'

const SET_LOCALE = 'SET_LOCALE'

export default ({
  state: {
    locale: localStorage.getItem('locale') || 'hu-HU'
  },
  getters: {
    getLocale: state => {
      return state.locale
    }
  },
  mutations: {
    [SET_LOCALE] (state, locale) {
      state.locale = locale
    }
  },
  actions: {
    changeLocale ({ commit }, locale) {
      localStorage.setItem('locale', locale)
      Vue.i18n.set(locale)
      Validator.localize(locale)
      moment.locale(locale)
      commit(SET_LOCALE, locale)
    },
    setLocale ({ state }) {
      Vue.i18n.set(state.locale)
      Validator.localize(state.locale)
      moment.locale(state.locale)
    }
  }
})
