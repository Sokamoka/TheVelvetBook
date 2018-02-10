<template>
  <div class="column is-4 is-offset-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ $t('login') }}
        </p>
      </header>
      <div class="card-content">
        <form @submit.prevent="login">
          <div class="field">
            <label class="label">{{ $t('email') }}</label>
            <div class="control has-icons-right">
              <input
                :class="{'input': true, 'is-danger': errors.has('email') }"
                name="email"
                type="text"
                :placeholder="$t('email')"
                v-model="email"
                v-validate="'required|email'"
              >
              <span v-show="errors.has('email')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p :class="{ 'help is-danger': true, 'is-active': errors.has('email') }">
                {{ errors.first('email') }}
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t('password') }}</label>
            <div class="control has-icons-right">
              <input
                :class="{'input': true, 'is-danger': errors.has('password') }"
                name="password"
                type="password"
                :placeholder="$t('password')"
                v-model="password"
                v-validate="'required|min:6'"
              >
              <span v-show="errors.has('password')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p :class="{ 'help is-danger': true, 'is-active': errors.has('password') }">
                {{ errors.first('password') }}
              </p>
            </div>
          </div>
          <div v-show="errorMessage.length" class="notification is-danger">
            {{ $t(errorMessage) }}
          </div>
          <div class="is-clearfix">
            <div class="field is-grouped is-pulled-right">
              <div class="control">
                <button type="button" class="button is-text">{{ $t('forgot-password') }}</button>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="button is-success is-rounded"
                  :class="{'is-loading': isPending}"
                >
                  {{ $t('login') }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    isPending () {
      return this.$store.state.auth.pending
    }
  },
  methods: {
    login () {
      let data = {
        client_id: 2,
        client_secret: 'e6YPtUQdN2Al9zUZehK8c99u3dU9msLSWPi3ZQHX',
        grant_type: 'password',
        username: this.email,
        password: this.password
      }
      this.$validator.validateAll().then(result => {
        if (result) {
          this.errorMessage = ''
          this.$store.dispatch('login', data)
            .then(res => {
              // console.log('LOGGED-IN')
              this.$router.push({name: 'Feed'})
            })
            .catch(error => {
              this.errorMessage = error.error
            })
        }
      })
    }
  }
}
</script>
