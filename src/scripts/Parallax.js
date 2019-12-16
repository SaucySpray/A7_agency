import anime from 'animejs'

class Parallax {
    constructor(elements, target, damping, offset, spread) {
        this.elements = elements
        this.target = target

        this.props = {
            damping: damping,
            offset: offset,
            spread: spread
        }

        this.mousePos = {
            x: 0,
            y: 0
        }

        this.newPos = {
            x: 0,
            y: 0
        }

        this.target.addEventListener('mousemove', (event) => {
            if(window.innerWidth > 992) {
                // Get mouse pos
                this.mousePos.x = event.clientX
                this.mousePos.y = event.clientY

                // Move to new position
                this.elements.forEach(element => {
                    this.move(element)
                })
            }
            else {
                this.reset()
            }
        })

        this.target.addEventListener('resize', () => {
            if(window.innerWidth <= 992) {
                this.reset()
            }
        })

        this.target.addEventListener('mouseenter', () => this.mouseIn())
        this.target.addEventListener('mouseleave', () => this.reset())
    }

    easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    }

    moveEase(element) {
        let dX = this.mousePos.x - element.getBoundingClientRect().x
        let dY = this.mousePos.y - element.getBoundingClientRect().y

        element.setAttribute('style', `transform: translate(${dX}px, ${dY}px);`)
    }

    move(element) {
        this.newPos.x = ((((this.mousePos.x / window.innerWidth) - this.props.damping) / this.props.offset) * this.props.spread)
        this.newPos.y = ((((this.mousePos.y / window.innerHeight) - this.props.damping) / this.props.offset) * this.props.spread)

        element.setAttribute('style', `transform: translate(${this.newPos.x}px, ${this.newPos.y}px);`)
    }

    mouseIn() {
        this.elements.forEach( element => {
            setTimeout(() => element.classList.remove('parallax--transition'), 250)
        })
    }

    reset() {
        this.elements.forEach((el) => {
            el.style.transform = 'translate(0, 0)';
            el.classList.add('parallax--transition');
        });
    }
}

const setParallax = () => {
    // Parallax
    const parallaxProps = {
        header: {
            damping: 1,
            offset: 5,
            spread: 40
        },
        menu: {
            damping: 0.5,
            offset: 2.5,
            spread: 70
        },
        content: {
            damping: 0.5,
            offset: 3.5,
            spread: 50
        },
        bg: {
            damping: 0.25,
            offset: 5,
            spread: 25
        }
    }

    const $header = document.querySelectorAll('[data-parallax="header"]')
    new Parallax($header, document.body, parallaxProps.header.damping, parallaxProps.header.offset, parallaxProps.header.spread)

    const $sidemenu = document.querySelectorAll('[data-parallax="sidemenu"]')
    new Parallax($sidemenu, document.body, parallaxProps.menu.damping, parallaxProps.menu.offset, parallaxProps.menu.spread)

    const $menu = document.querySelectorAll('[data-parallax="menu"]')
    new Parallax($menu, document.body, parallaxProps.menu.damping, parallaxProps.menu.offset, parallaxProps.menu.spread)

    const $homeBg = document.querySelectorAll('[data-parallax="home-bg"]')
    new Parallax($homeBg, document.body, parallaxProps.bg.damping, parallaxProps.bg.offset, parallaxProps.bg.spread)
    const $home = document.querySelectorAll('[data-parallax="home"]')
    new Parallax($home, document.body, parallaxProps.content.damping, parallaxProps.content.offset, parallaxProps.content.spread)

    const $aboutBg = document.querySelectorAll('[data-parallax="about-bg"]')
    new Parallax($aboutBg, document.body, parallaxProps.bg.damping, parallaxProps.bg.offset, parallaxProps.bg.spread)
    const $about = document.querySelectorAll('[data-parallax="about"]')
    new Parallax($about, document.body, parallaxProps.content.damping, parallaxProps.content.offset, parallaxProps.content.spread)

    const $teamBg = document.querySelectorAll('[data-parallax="team-bg"]')
    new Parallax($teamBg, document.body, parallaxProps.bg.damping, parallaxProps.bg.offset, parallaxProps.bg.spread)
    const $team = document.querySelectorAll('[data-parallax="team"]')
    new Parallax($team, document.body, parallaxProps.content.damping, parallaxProps.content.offset, parallaxProps.content.spread)

    const $clientsBg = document.querySelectorAll('[data-parallax="clients-bg"]')
    new Parallax($clientsBg, document.body, parallaxProps.bg.damping, parallaxProps.bg.offset, parallaxProps.bg.spread)
    const $clients = document.querySelectorAll('[data-parallax="clients"]')
    new Parallax($clients, document.body, parallaxProps.content.damping, parallaxProps.content.offset, parallaxProps.content.spread)
}

export { setParallax }