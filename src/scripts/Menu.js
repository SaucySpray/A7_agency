import * as Anims from './Animations'

const Menu = () => {
    // Menu IsAppeard ?
    let IsAppeard = false

    const transitionDelay = 900

    // DOM Elements
    const $menuElements = document.querySelectorAll('.js-menu-el')
    const $home = document.querySelectorAll('.header__logo')
    const $homeSection = document.querySelector('#home')
    const $about = document.querySelectorAll('.js-menu-about')
    const $aboutSection = document.querySelector('#about')
    const $team = document.querySelectorAll('.js-menu-team')
    const $teamSection = document.querySelector('#team')
    const $clients = document.querySelectorAll('.js-menu-clients')
    const $clientsSection = document.querySelector('#clients')

    // Landing Anims
    setTimeout(() => {
        Anims.contentIn($homeSection.querySelector('.home__wrapper'))
        Anims.contentIn(document.querySelectorAll('[data-animation="intro"]'))
    }, 1750)

    // Events
    $menuElements.forEach(el => {
        el.addEventListener('click', () => {

            if (!IsAppeard) {
                Anims.menuIn()
                IsAppeard = true
            }

            Anims.bgInOut('.transition')
        })
    })

    $home.forEach(el => {
        el.addEventListener('click', () => {
            setTimeout( () => {
                window.scrollBy(0, $homeSection.getBoundingClientRect().top)
                Anims.contentIn($homeSection.querySelector('[data-animation="content"]'))
                $menuElements.forEach(el => el.classList.remove('js-menu-active'))
                $home.forEach(el => el.classList.add('js-menu-active'))
            }, transitionDelay)

            IsAppeard = false
        })
    })

    $about.forEach(el => {
        el.addEventListener('click', () => {
            setTimeout( () => {
                window.scrollBy(0, $aboutSection.getBoundingClientRect().top)
                Anims.contentIn($aboutSection.querySelector('[data-animation="content"]'))
                $menuElements.forEach(el => el.classList.remove('js-menu-active'))
                $about.forEach(el => el.classList.add('js-menu-active'))
            }, transitionDelay)
        })
    })

    $team.forEach(el => {
        el.addEventListener('click', () => {
            setTimeout( () => {
                window.scrollBy(0, $teamSection.getBoundingClientRect().top)
                Anims.contentIn($teamSection.querySelectorAll('[data-animation="content"]'))
                $menuElements.forEach(el => el.classList.remove('js-menu-active'))
                $team.forEach(el => el.classList.add('js-menu-active'))
            }, transitionDelay)
        })
    })

    $clients.forEach(el => {
        el.addEventListener('click', () => {
            setTimeout( () => {
                window.scrollBy(0, $clientsSection.getBoundingClientRect().top)
                Anims.contentIn($clientsSection.querySelectorAll('[data-animation="content"]'))
                $menuElements.forEach(el => el.classList.remove('js-menu-active'))
                $clients.forEach(el => el.classList.add('js-menu-active'))
            }, transitionDelay)
        })
    })
}

export { Menu }