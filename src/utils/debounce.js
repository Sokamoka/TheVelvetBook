export default (fn, delay) => {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let that = this
    timeoutID = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}
