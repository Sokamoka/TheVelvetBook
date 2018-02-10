<template>
  <content-placeholder :rows="placeholderRows" v-show="loading"></content-placeholder>
</template>
<script>
import ContentPlaceholder from 'vue-content-placeholder'

export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      placeholderRows: this.rows
    }
  },
  components: {
    ContentPlaceholder
  }
}
</script>
<style lang="scss">
  .animated-background {
    .box {
      padding: 0;
      border-radius: 0;
      border: none;
      box-shadow: none;
      background-color: #FAFAFA;
    }
  }

</style>
