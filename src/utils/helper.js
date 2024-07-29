/**
 * This function use to debounce the function call.
 * @param {function} func - The function to be debounced.
 * @param {number} wait - The time to wait before calling the function.
 */
export function debounce(func, wait) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
