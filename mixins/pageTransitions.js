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

    if(to.params.step){
      if(from.name === 'get-started'){
        return slideLeft
      }
      if(from.name === 'thankyou'){
        return slideRight
      }
    }
    if(from.params.step){
      if(to.name === 'get-started'){
        return slideRight
      }
      if(to.name === 'thankyou'){
        return slideLeft
      }
    }

    if(to.params.step && from.params.step){
      return +to.params.step < +from.params.step ? slideRight : slideLeft
    }
  
    return fadeIn
    
  },
}
