<template>
  <div class="inline-edit">
    <textarea
      v-if="visibility"
      :class="{ 'inline-edit__input': true, 'is-danger': validate }"
      :rows="rows"
      :maxlength="maxlength"
      v-model="item"
      @blur="blur"
      @keydown.enter="blur"
      @change="changed"
      v-focus
      v-autoresize
    ></textarea>
    <div
      v-else
      @click="click"
      :class="{ 'inline-edit__text': true, 'is-danger': validate }"
    >
      {{ item }}
      <span
        v-show="item.length == 0"
        :class="{ 'inline-edit__placeholder': true, 'is-danger': validate }"
      >
        {{ $t(placeholder) }}
      </span>
    </div>
    <div v-show="visibility" class="inline-edit__help">
      {{ count }}
    </div>
  </div>
</template>
<script>
import { focus } from '../../directives/focus.js'
import { autoresize } from '../../directives/autoresize.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 50
    },
    rows: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: 'title'
    },
    validator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visibility: false
    }
  },
  directives: {
    focus,
    autoresize
  },
  computed: {
    item: {
      set (value) {
        this.$emit('input', value.replace(/[\r\n\v]+/g, ''))
      },
      get () {
        return this.value
      }
    },
    count () {
      return this.maxlength - this.value.length
    },
    validate () {
      return this.validator === 'required' && this.value.length === 0
    }
  },
  methods: {
    click () {
      this.visibility = true
    },
    blur () {
      this.visibility = false
    },
    changed () {
      if (!this.validate) this.$emit('change')
    }
  }
}
</script>
