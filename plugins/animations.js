import gsap from 'gsap'

export default (context, inject) => {
    const animations = {}

    animations.buttonPulse = (btnClass) => {
        const tl = gsap.timeline()
        tl.to(btnClass, {
            duration: 0.2,
            scale: 1.1,
            ease: 'power2.in',
        })
        tl.to(btnClass, {
            duration: 0.4,
            scale: 1,
            ease: 'power2.out',
        })
        return tl
    }

    animations.stepsNavAnimation = () => {
        const tl = gsap.timeline()
        tl.fromTo(
            '.steps-nav',
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.2,
            }
        )
        tl.fromTo(
            '.steps-nav-item',
            {
                opacity: 0,
                scale: 0,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.1,
                ease: 'power4.out',
            }
        )
        return tl
    }

    animations.slideDown = (el) => {
        const tl = gsap.timeline()
        tl.fromTo(
            el,
            {
                height: 0,
            },
            {
                height: 'auto',
                duration: 0.4,
                ease: 'power2.in',
            }
        )
    }

    animations.slideUp = (el) => {
        const tl = gsap.timeline()
        tl.to(el, {
            height: 0,
            duration: 0.4,
            ease: 'power2.out',
        })
    }

    animations.beforeEnterList = (el) => {
        el.style.opacity = 0
        el.style.transform = 'translateX(-20px)'
    }

    animations.enterList = (el, done) => {
        const delay = el.dataset.index === 0 ? 0.5 : el.dataset.index * 0.15 + 0.5
        gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.2,
            onComplete: done,
            delay,
        })
    }

    inject('animations', animations)
}
