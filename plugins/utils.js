export default ({ app }, inject) => {
    const utils = {}

    utils.debounce = (callback, wait) => {
        let timeout
        return (...args) => {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => callback.apply(context, args), wait)
        }
    }

    inject('utils', utils)
}
