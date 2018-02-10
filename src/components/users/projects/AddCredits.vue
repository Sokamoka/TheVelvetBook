<template>
  <div class="column is-10 is-offset-1">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Credits
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-info" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content credits-list">
          <div class="columns">
            <div class="column is-1">
              <label>{{ $t('order') }}</label>
            </div>
            <div class="column">
              <label>{{ $t('category') }}</label>
            </div>
            <div class="column">
              <label>{{ $t('name') }}</label>
            </div>
            <div class="column">
              <label>{{ $t('url') }}</label>
            </div>
            <div class="column is-1">
              <label>{{ $t('delete') }}</label>
            </div>
          </div>
          <form @submit.prevent="save">
            <draggable v-model="creditsList" :options="{ handle: '.drag-button' }" class="draggable-container">
              <div class="columns" v-for="(item, index) in creditsList" :key="index">
                <div class="column is-1">
                  <div class="field">
                    <div class="control">
                      <button type="button" class="button is-white drag-button"><i class="fa fa-bars" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <div class="control has-icons-right">
                      <div
                        :class="{'select is-fullwidth': true, 'is-danger': errors.has('creditcategry'+index) }"
                      >
                        <select
                          v-model="item.category"
                          :name="'creditcategry'+index"
                          v-validate="{ required: true }"
                          data-vv-as="creditcategry"
                        >
                          <option disabled value="">{{ $t('select-category') }}</option>
                          <option v-for="category in categories" :value="category">{{ $t('categories.'+category) }}</option>
                        </select>
                      </div>
                      <!-- span v-show="errors.has('creditcategry')" class="icon is-small is-right has-text-danger">
                        <i class="fa fa-warning"></i>
                      </span -->
                      <p :class="{ 'help is-danger': true, 'is-active': errors.has('creditcategry'+index) }">
                        {{ errors.first('creditcategry'+index) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <div class="control has-icons-right">
                      <input
                        :class="{'input': true, 'is-danger': errors.has('credituser'+index) }"
                        :name="'credituser'+index"
                        :placeholder="$t('name')"
                        v-model="item.creditname"
                        v-validate="{ required: true }"
                        data-vv-as="credituser"
                      >
                      <span v-show="errors.has('credituser'+index)" class="icon is-small is-right has-text-danger">
                        <i class="fa fa-warning"></i>
                      </span>
                      <p :class="{ 'help is-danger': true, 'is-active': errors.has('credituser'+index) }">
                        {{ errors.first('credituser'+index) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <div class="control has-icons-right">
                      <input
                        :class="{'input': true, 'is-danger': errors.has('url'+index) }"
                        :name="'url'+index"
                        :placeholder="$t('url')"
                        v-model="item.url"
                        v-validate="{ url: true }"
                        data-vv-as="url"
                      >
                      <span v-show="errors.has('url'+index)" class="icon is-small is-right has-text-danger">
                        <i class="fa fa-warning"></i>
                      </span>
                      <p :class="{ 'help is-danger': true, 'is-active': errors.has('url'+index) }">
                        {{ errors.first('url'+index) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-1">
                  <div class="field">
                    <div class="control">
                      <button type="button" class="button is-danger is-rounded is-outlined" @click="remove(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div class="columns">
              <div class="column">
                <button type="button" class="button is-rounded is-light" @click="add"><i class="fa fa-plus" aria-hidden="true"></i></button>
              </div>
              <div class="column">
                <button
                  :class="{ 'button is-primary is-rounded is-pulled-right': true, 'is-loading': saving }"
                  type="submit"
                  :disabled="buttonDisbaled"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { AVAILABLE_CATEGORIES } from '../../../constans'

export default {
  props: {
    value: {
      type: Array,
      default: {}
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      categories: AVAILABLE_CATEGORIES
    }
  },
  components: {
    draggable
  },
  mounted () {
    this.initList()
  },
  computed: {
    buttonDisbaled () {
      return this.value.length === 0
    },
    creditsList: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }

    }
  },
  methods: {
    add () {
      this.$emit('add')
    },
    remove (index) {
      this.$emit('remove', index)
    },
    save () {
      console.log(this.$validator)
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('save')
        }
      })
    },
    initList () {
      if (this.value.length === 0) this.add()
    }
  }
}
</script>
