import Vue from 'vue'
import { Validator } from 'vee-validate'

export const setLocale = ({ commit }, locale) => {
  Vue.i18n.set(locale)
  Validator.localize(locale)
  // Vue.use(VeeValidate, {locale: locale})
}
