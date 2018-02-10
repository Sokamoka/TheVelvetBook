const defaultMax = 150

export const inputCount = {
  bind (el, binding, vnode) {
    // console.log(binding.value)
    const input = el.querySelector('.input-count__input')
    const label = el.querySelector('.input-count__label')
    const max = binding.value.max || defaultMax
    const model = binding.value.model

    vnode.context[model] = max
    input.setAttribute('maxlength', max)
    input.addEventListener('focus', () => label.classList.add('is-active'), true)
    input.addEventListener('blur', () => label.classList.remove('is-active'), true)
    input.addEventListener('input', (e) => { vnode.context[model] = max - e.target.value.length }, true)
  },
  unbind () {
    //
  }
}
