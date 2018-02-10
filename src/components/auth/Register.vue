<template>
  <div class="column is-4 is-offset-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ $t('registration') }}
        </p>
      </header>
      <div class="card-content">
        <form @submit.prevent="register">
          <div class="field">
            <label class="label">{{ $t('name') }}</label>
            <div class="control has-icons-right">
              <input
               :class="{'input': true, 'is-danger': errors.has('username') }"
               name="username"
               type="text"
               :placeholder="$t('name')"
               v-model="user.name"
               v-validate="'required'"
              >
              <span v-show="errors.has('username')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p
                class="help is-danger"
                v-show="errors.has('username')"
              >
                {{ errors.first('username') }}
              </p>
            </div>
          </div>
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
              <p
                class="help is-danger"
                v-show="errors.has('email')"
              >
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
              <p
                class="help is-danger"
                v-show="errors.has('password')"
              >
                {{ errors.first('password') }}
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t('confirmed-password') }}</label>
            <div class="control has-icons-right">
              <input
                :class="{'input': true, 'is-danger': errors.has('confirmed_password') }"
                name="confirmed_password"
                type="password"
                :placeholder="$t('confirmed-password')"
                v-validate="'required|confirmed:password'"
              >
              <span v-show="errors.has('confirmed_password')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p
                class="help is-danger"
                v-show="errors.has('confirmed_password')"
              >
                {{ errors.first('confirmed_password') }}
              </p>
            </div>
          </div>
          <div v-show="errorMessage.length" class="notification is-danger">
            {{ $t(errorMessage) }}
          </div>
          <div class="is-clearfix">
            <div class="field is-grouped is-pulled-right">
              <div class="control">
                <button
                  type="submit"
                  class="button is-success is-rounded"
                  :class="{'is-loading': isPending}"
                >
                  {{ $t('registration') }}
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
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      user: {}
    }
  },
  computed: {
    isPending () {
      return this.$store.state.pending
    }
  }
}
</script>
