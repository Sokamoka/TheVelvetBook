import Vue from 'vue'
export const autoresize = {
  bind (el, binding, vnode) {
    const textarea = el
    const originalHeight = textarea.clientHeight

    let offset = 0
    Vue.nextTick(() => {
      const style = window.getComputedStyle(el, null)
      offset = parseInt(style.borderBottomWidth) + parseInt(style.borderTopWidth)
      autosize()
    })

    const autosize = () => {
      // console.log('AUTOSIZE', textarea.scrollHeight, textarea.offsetHeight, textarea.style.height)
      if (textarea.scrollHeight > originalHeight) {
        textarea.style.height = ''
        textarea.style.height = (textarea.scrollHeight + offset) + 'px'
      }
    }
    textarea.addEventListener('input', autosize, false)
    el.autosize = autosize
  },
  unbind (el, binding, vnode) {
    el.removeEventListener('input', el.autosize, false)
  }
}
