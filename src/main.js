// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VeeValidate from 'vee-validate'
import store from './store'
import localeStore from './localization'
import VueClazyLoad from 'vue-clazy-load'
import VTooltip from 'v-tooltip'
import directives from './directives'
import './packages/confirm'
import './assets/styles/main.scss'

Vue.use(VTooltip)
// Vue.use(VeeValidate)
Vue.use(VueClazyLoad)

Vue.config.productionTip = false

router.beforeEach(
  (to, from, next) => {
    console.log('ROUTER:', to)
    store.dispatch('updateExpiration')

    if (store.getters.getLocale) {
      store.dispatch('setLocale')
    }
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (store.getters.isAuthenticated) {
        next({
          name: 'Feed'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!store.getters.isAuthenticated) {
        next({
          name: 'Login'
        })
      } else next()
    } else next()
  }
)

export const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  localeStore,
  template: '<App/>',
  components: { App },
  directives: { directives }
})
