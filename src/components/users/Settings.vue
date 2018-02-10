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
                  {{ $t('settings') }}
                </p>
              </header>
              <div class="card-content">
                <form @submit.prevent="saveSettings">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('name') }}<span class="has-text-primary">*</span></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
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
                          <p :class="{ 'help is-danger': true, 'is-active': errors.has('username') }">
                            {{ errors.first('username') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('url') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <input
                           :class="{'input': true, 'is-danger': errors.has('url') }"
                           name="url"
                           type="text"
                           autocomplete="off"
                           :placeholder="$t('url')"
                           v-model="user.url"
                           v-validate="'url'"
                          >
                          <span v-show="errors.has('url')" class="icon is-small is-right has-text-danger">
                            <i class="fa fa-warning"></i>
                          </span>
                          <p :class="{ 'help is-danger': true, 'is-active': errors.has('url') }">
                            {{ errors.first('url') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('description') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right" v-input-count="{ model: 'descriptionCount', max: 150 }">
                          <textarea
                           name="description"
                           :class="{'textarea': true, 'input-count__input': true}"
                           :placeholder="$t('description')"
                           v-model="description"
                           rows="4"
                          ></textarea>
                          <span v-show="errors.has('description')" class="icon is-small is-right has-text-danger">
                            <i class="fa fa-warning"></i>
                          </span>
                          <p class="help input-count__label">{{ $t('remaining-characters', {count: descriptionCount}) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('category') }}<span class="has-text-primary">*</span></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <div
                            :class="{'select': true, 'is-danger': errors.has('category') }"
                          >
                            <select
                              name="category"
                              v-validate="'required'"
                            >
                              <option selected disabled value="">{{ $t('select-category') }}</option>
                              <option v-for="category in categories" :value="category">{{ category }}</option>
                            </select>
                          </div>
                          <span v-show="errors.has('category')" class="icon is-small is-right has-text-danger">
                            <i class="fa fa-warning"></i>
                          </span>
                          <p :class="{ 'help is-danger': true, 'is-active': errors.has('category') }">
                            {{ errors.first('category') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('country') }}<span class="has-text-primary">*</span></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control has-icons-right">
                          <div :class="{'select': true, 'is-fullwidth': false, 'is-danger': errors.has('country') }">
                            <select
                              name="country"
                              v-validate="'required'"
                              v-model="country"
                            >
                              <option selected disabled value="">{{ $t('select-country') }}</option>
                              <option v-for="country in countries" :value="country">{{ $t('countries.'+country) }}</option>
                            </select>
                          </div>
                          <span v-show="errors.has('country')" class="icon is-small is-right has-text-danger">
                            <i class="fa fa-warning"></i>
                          </span>
                          <p :class="{ 'help is-danger': true, 'is-active': errors.has('country') }">
                            {{ errors.first('country') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">{{ $t('social-links') }}</label>
                    </div>
                    <div class="field-body">
                      <div class="field is-expanded">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static">
                              facebook.com/
                            </a>
                          </p>
                          <p class="control is-expanded">
                            <input class="input" type="text" placeholder="">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label"></div>
                    <div class="field-body">
                      <div class="field is-expanded">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static">
                              instagram.com/
                            </a>
                          </p>
                          <p class="control is-expanded">
                            <input class="input" type="text" placeholder="">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label"></div>
                    <div class="field-body">
                      <div class="field is-expanded">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static">
                              twitter.com/
                            </a>
                          </p>
                          <p class="control is-expanded">
                            <input class="input" type="text" placeholder="">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-show="errorMessage.length" class="notification is-danger">
                    {{ $t(errorMessage) }}
                  </div>
                  <div class="is-clearfix">
                    <div class="field is-grouped is-grouped-right">
                      <div class="control">
                        <button
                          type="submit"
                          class="button is-primary is-rounded"
                          :class="{'is-loading': isPending}"
                        >
                          {{ $t('save') }}
                        </button>
                      </div>
                    </div>
                    <div class="field is-grouped">
                      <p class="control">
                        <a class="button is-light">
                          Fiók törlése
                        </a>
                      </p>
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
import textareaRemaining from '../base/Textarea'
import { AVAILABLE_COUNTRIES, AVAILABLE_CATEGORIES } from '../../constans'

export default {
  data () {
    return {
      username: '',
      password: '',
      category: '',
      country: '',
      errorMessage: '',
      countries: AVAILABLE_COUNTRIES,
      categories: AVAILABLE_CATEGORIES,
      description: '',
      descriptionCount: 0
    }
  },
  computed: {
    isPending () {
      return this.$store.state.pending
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    saveSettings () {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log('IS VALID!')
        }
      })
    }
  },
  components: {
    userMenu,
    information,
    textareaRemaining
  }
}
</script>
<style scoped>
  .field-body {
    flex-grow: 3;
  }
</style>
