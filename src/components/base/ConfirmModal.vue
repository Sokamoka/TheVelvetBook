<template>
  <modal :toggle="isVisible" @close:toggle="val => isVisible = val">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ $t(title) }}
        </p>
      </header>
      <div class="card-content">
        <!-- CONTENT START -->
        {{ content }}
        <!-- CONTENT END -->
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-rounded" @click="cancel">{{ $t('cancel') }}</button>
            </div>
            <div class="control">
              <button
                class="button is-primary is-rounded"
                @click="ok"
              >
                {{ $t('ok') }}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </modal>
</template>
<script>
  import Vue from 'vue'
  import modal from './Modal'

  export default {
    props: {
      title: String,
      content: String
    },
    data () {
      return {
        isVisible: false
      }
    },
    components: {
      modal
    },
    mounted () {
      this.isVisible = true
    },
    methods: {
      cancel () {
        this.isVisible = false
        Vue.nextTick(() => {
          this.$close(false)
        })
      },
      ok () {
        this.isVisible = false
        Vue.nextTick(() => {
          this.$close(true)
        })
      }
    }
  }
</script>
