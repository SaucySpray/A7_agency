import anime from 'animejs'

export const contentIn = (_target) => {
    anime({
        targets: _target,
        scale: 1,
        opacity: 1,
        duration: 800,
        easing: 'easeInOutQuart',
        delay: anime.stagger(60)
    })
}

export const loader = (_target) => {
    const t1 = anime.timeline({
        easing: 'easeInOutQuart'
    })

    t1.add({
        targets: _target,
        opacity: 1,
        duration: 0,
    })
    t1.add({
        targets: '.transition__loader>g path',
        strokeDashoffset: [anime.setDashoffset, 0],
        fill: 'white',
        easing: 'easeInOutSine',
        duration: 1200,
        delay: function (el, i) { return i * 250 },
        direction: 'alternate',
    })
    t1.add({
        targets: _target,
        opacity: 0,
        duration: 750,
        delay: 100
    }, '-=400')
    t1.complete = function(anim) {
        document.querySelector('.transition__loader').style.display = 'none'
    }
}

export const bgInOut = (_target) => {
    const t1 = anime.timeline({
        easing: 'easeInOutQuart'
    })

    t1.add({
        targets: _target,
        opacity: 1,
        duration: 750,
        delay: 100
    })
    t1.add({
        targets: _target,
        opacity: 0,
        duration: 750,
        delay: 100
    })
}

export const menuIn = () => {
    const t1 = anime.timeline({
        delay: 1350,
        easing: 'easeOutQuad'
    })

    t1.add({
        targets: '[data-animation="menu-line"]',
        height: '100%',
        duration: 400,
    })
    t1.add({
        targets: '[data-animation="menu-el"]',
        translateX: '160%',
        duration: 800,
        delay: anime.stagger(100)
    }, '-=300')
}