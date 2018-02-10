import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import translationsHu from './languages/hu-HU'
import translationsEn from './languages/en-GB'
import VeeValidate from 'vee-validate'
import moment from 'moment'

import hu from './languages/validator_hu'
import en from './languages/validator_en'

// VeeValidate dictionary
const dictionary = {
  'en-GB': en,
  'hu-HU': hu
}
// vuexI18n options
const options = {
  moduleName: 'i18n',
  onTranslationNotFound (locale, key) {
    console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`)
  }
}

Vue.use(VeeValidate, {locale: 'hu-HU', dictionary, events: 'input'})

const localeStore = new Vuex.Store()

Vue.use(vuexI18n.plugin, localeStore, options)

Vue.i18n.add('en-GB', translationsEn)
Vue.i18n.add('hu-HU', translationsHu)
Vue.i18n.set('hu-HU')

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('LL')
  }
})

export default localeStore
