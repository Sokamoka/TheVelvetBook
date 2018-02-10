<template>
  <div :class="{ 'modal': true, 'is-active': isVisible }">
    <div class="modal-background" @click.self="close"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>
<script>
  export default {
    props: {
      toggle: {
        type: Boolean,
        dafault: false
      }
    },
    data () {
      return {
        // isVisible: this.toggle
      }
    },
    computed: {
      isVisible () {
        return this.toggle
      }
    },
    methods: {
      close () {
        this.$emit('close:toggle', false)
      }
    }
  }
</script>
<style scoped lang="scss">
  .modal {
    display: flex;
    visibility: hidden;
    -webkit-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
    -moz-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
    -ms-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
    -o-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
    transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
    opacity: 0;

    &.is-active {
      visibility: visible;
      transition-delay: 0s;
      zoom: 1;
      opacity: 1;
    }
  }
</style>
