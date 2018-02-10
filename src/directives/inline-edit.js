export const inlineEdit = {

  inserted (el, binding, vnode, old) {
    el.container = document.createElement('div')
    el.container.classList.add('inline-edit')
    vnode.elm.parentElement.appendChild(el.container)
    el.input = vnode.elm.parentElement.removeChild(vnode.elm)
    el.input.classList.add('inline-edit__input')
    el.input.style = 'display: none;'
    el.container.appendChild(el.input)
    /*
    text = document.createElement('div')
    text.classList.add('inline-edit__text')
    container.appendChild(text)
    */
    el.container.appendChild(el.text)
    el.text.innerHTML = vnode.elm.value
    el.input.addEventListener('blur', () => {
      // if (val !== el.value) vnode.context.$emit('changed')
      el.text.innerHTML = vnode.elm.value
      el.input.style = 'display: none;'
      el.text.style = 'display: block;'
    }, true)
  },

  bind (el, binding, vnode) {
    console.log('el:', el.value)
    /*
    el.classList.add('inline-edit')
    const input = el.querySelector('.input-edit__input')
    input.classList.add('inline-edit__input')
    input.style = 'display: none;'
    */
    el.text = document.createElement('div')
    el.text.classList.add('inline-edit__text')
    /*
    el.newContent = document.createTextNode('sdfsdfsdfsdsf')
    el.text.appendChild(el.newContent)
    */

    const focus = () => {
      el.input.style = 'display: block;'
      el.text.style = 'display: none;'
      el.input.focus()
    }

    el.text.addEventListener('click', focus, true)
  },
  update (element, binding, vnode, oldVnode) {
    // console.log('UPDATE', 'vnode:', vnode.elm.value.length)
  }
}
