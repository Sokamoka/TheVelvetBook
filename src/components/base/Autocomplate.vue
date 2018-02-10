<template>
  <div :class="{ 'dropdown': true, 'is-active': openSuggestion }">
    <div class="dropdown-trigger">
      <input
        :class="inputClass"
        type="text"
        autocomplete="off"
        v-model.lazy="selection"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="change"
        @keydown.down="down"
        @keydown.up="up"
        @blur="blur"
        @focus="focus"
        @keydown.enter="enter"
        v-debounce="500"
      />
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a
          href="#"
          v-for="(suggestion, index) in matches"
          :key="index"
          :class="{'dropdown-item':true, 'is-active': isActive(index)}"
          @click.prevent="suggestionClick(index)"
        >
          {{ suggestion[suggestionAttribute] }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import debounce from '../../directives/debounce'
  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      suggestions: {
        type: Array,
        required: true
      },
      suggestionAttribute: {
        type: String,
        default: 'name'
      },
      placeholder: {
        type: String,
        default: ''
      },
      maxlength: {
        type: Number,
        default: 16
      },
      inputClass: {
        type: String,
        default: 'input'
      }
    },
    data () {
      return {
        open: false,
        current: 0,
        selection: this.value[this.suggestionAttribute] || ''
      }
    },
    directives: {
      debounce
    },
    computed: {
      matches () {
        return this.suggestions.filter(str => {
          let selection = this.selection ? this.selection.toLowerCase() : this.selection
          return str[this.suggestionAttribute].toLowerCase().includes(selection)
        })
      },
      openSuggestion () {
        return this.selection !== '' &&
          this.matches.length !== 0 &&
          this.open === true
      }
    },
    watch: {
      value (val) {
        this.selection = val[this.suggestionAttribute]
      }
    },
    methods: {
      enter () {
        let matches = this.matches[this.current]
        if (this.matches.length) {
          this.selection = matches[this.suggestionAttribute]
        } else {
          let matchObj = Object.keys(this.suggestions[0]).reduce((o, key) => ({...o, [key]: null}), {})
          matchObj[this.suggestionAttribute] = this.selection
          matches = matchObj
        }
        this.open = false
        this.current = 0
        this.$emit('input', matches)
        this.$emit('change')
      },
      change (e) {
        console.log(e.target.value)
        this.$emit('input-keydown', e.target.value)
        if (this.open === false) {
          this.open = true
          this.current = 0
        }
      },
      up () {
        if (this.current > 0) {
          this.current--
        }
      },
      down () {
        if (this.current < this.matches.length - 1) {
          this.current++
        }
      },
      focus () {
        this.open = true
        this.$emit('focus')
      },
      blur () {
        setTimeout(() => { this.open = false }, 300)
        this.$emit('blur')
      },
      isActive (index) {
        return index === this.current
      },
      suggestionClick (index) {
        this.$emit('input', this.matches[index])
        this.selection = this.matches[index][this.suggestionAttribute]
        this.open = false
        this.$emit('change')
      }
    }
  }
</script>
