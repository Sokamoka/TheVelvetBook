<template>
</template>
<script>
import { RESTORE_TOAST_GOAWAY_TIME } from '../../constans'
export default {
  props: {
    title: String,
    dialogId: Number
  },
  data () {
    return {
      interval: null
    }
  },
  mounted () {
    // console.log('MOUNTED', this.dialogId)
    let _this = this
    this.$toasted.show(this.title, {
      duration: RESTORE_TOAST_GOAWAY_TIME,
      icon: {
        name: 'fa-trash-o'
      },
      action: [
        {
          text: _this.$t('undo'),
          onClick: (e, toastObject) => {
            _this.undo()
            toastObject.goAway(0)
          }
        },
        {
          text: _this.$t('delete'),
          onClick: (e, toastObject) => {
            _this.delete()
            toastObject.goAway(0)
          }
        }
      ],
      onComplete: () => {
        _this.delete()
      }
    })
  },
  methods: {
    undo () {
      this.$close(true)
    },
    delete () {
      this.$close(false)
    }
  }
}
</script>
