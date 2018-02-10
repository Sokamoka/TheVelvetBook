<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">User</a></li>
          <li class="is-active"><a href="#" aria-current="page">Edit</a></li>
        </ul>
      </nav>
      <div class="columns">
        <div class="column is-3">
          <user-menu></user-menu>
        </div>
        <div class="column is-6">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ $t('modify-password') }}
                </p>
              </header>
              <div class="card-content">
                <form @submit.prevent="changePassword">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('email') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <input
                            class="input"
                            name="email"
                            type="text"
                            :placeholder="$t('email')"
                            v-model="email"
                            disabled
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('newemail') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <input
                            class="input"
                            name="newemail"
                            type="text"
                            :placeholder="$t('newemail')"
                            v-model="newemail"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('newemail') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <input
                            class="input"
                            name="newemail"
                            type="text"
                            :placeholder="$t('newemail')"
                            v-model="newemail"
                          >
                        </div>
                      </div>
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
                          {{ $t('save') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </div>
        <div class="column is-3">
          <information></information>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import userMenu from './Menu.vue'
import information from './Information.vue'

export default {
  data () {
    return {
      email: '',
      newpassword: '',
      errorMessage: ''
    }
  },
  computed: {
    isPending () {
      return this.$store.state.pending
    }
  },
  methods: {
    changePassword () {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log('IS VALID!')
        }
      })
    }
  },
  components: {
    userMenu,
    information
  }
}
</script>
<style scoped>
  .field-body {
    flex-grow: 3;
  }
</style>
