// see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export default ({ app }, inject) => {

    const viewport = {}

    let rootElement = document.body
    if (document.fullscreenElement || document.webkitCurrentFullScreenElement) {
        rootElement =
            document.fullscreenElement || document.webkitCurrentFullScreenElement
    }

    viewport.calcHeight = () => {
        const vh = window.innerHeight * 0.01
        rootElement.style.setProperty('--vh', `${vh}px`)

        window.addEventListener(
            'resize',
            app.$utils.debounce(() => {
                const vh = window.innerHeight * 0.01
                rootElement.style.setProperty('--vh', `${vh}px`)
            }, 200),
            { once: false }
        )
    }

    inject('viewport', viewport)
}