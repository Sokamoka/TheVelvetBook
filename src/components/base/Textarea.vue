<template>
  <div>
    <textarea
      ref="ta"
      :rows="rows"
      @input="update"
      :maxlength="max"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      class="textarea"
    >{{ value }}</textarea>
    <p :class="{ 'help': true, 'is-active': isFocus}">{{ $t('remaining-characters', {count: remaining}) }}</p>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      dafault: ''
    },
    max: {
      type: Number,
      dafault: 150
    },
    placeholder: {
      type: String
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      isFocus: false
    }
  },
  computed: {
    remaining () {
      return this.max - this.value.length
    }
  },
  methods: {
    update () {
      this.$emit('input', this.$refs.ta.value)
    },
    onFocus (e) {
      this.isFocus = true
    },
    onBlur () {
      this.isFocus = false
    }
  }
}
</script>
<style scoped lang="scss">
.help {
  /*
  opacity: 0;
  transform: translate3d(0, -20px, 0);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  */
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;

  &.is-active {
    /*
    transform: translate3d(0, 0, 0);
    opacity: 1;
    */
    max-height: 30px;
    transition: max-height 0.25s ease-in;
  }
}
</style>
