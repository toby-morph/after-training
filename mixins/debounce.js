// https://chrisboakes.com/how-a-javascript-debounce-function-works/
export const debounce = {
  methods: {
    debounce(callback, wait) {
      let timeout
      return (...args) => {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => callback.apply(context, args), wait)
      }
    },
  },
}
