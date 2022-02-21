export const pageTransitions = {
  transition(to, from) {
    const slideLeft = {
      name: 'slide-left',
      mode: 'out-in',
    }
    const slideRight = {
      name: 'slide-right',
      mode: 'out-in',
    }
    const fadeIn = {
      name: 'fade-in',
      mode: 'out-in',
    }

    if (!from || !to) {
      return fadeIn
    }

    const fadeInRoutes = ['index','privacy','cookies','accessibility','settings']
    if(fadeInRoutes.includes(to.name) || fadeInRoutes.includes(from.name)){
      return fadeIn
    }

    if (to.name === 'get-started') {
      return slideRight
    } else if (from.name === 'thankyou') {
      return slideRight
    }

    return +to.params.step < +from.params.step ? slideRight : slideLeft
  },
}