const scroll = () => {
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

    // Events
    $home.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollBy(0, $homeSection.getBoundingClientRect().top)
            $menuElements.forEach(el => el.classList.remove('js-menu-active'))
            $home.forEach(el => el.classList.add('js-menu-active'))
        })
    })

    $about.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollBy(0, $aboutSection.getBoundingClientRect().top)
            $menuElements.forEach(el => el.classList.remove('js-menu-active'))
            $about.forEach(el => el.classList.add('js-menu-active'))
        })
    })

    $team.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollBy(0, $teamSection.getBoundingClientRect().top)
            $menuElements.forEach(el => el.classList.remove('js-menu-active'))
            $team.forEach(el => el.classList.add('js-menu-active'))
        })
    })

    $clients.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollBy(0, $clientsSection.getBoundingClientRect().top)
            $menuElements.forEach(el => el.classList.remove('js-menu-active'))
            $clients.forEach(el => el.classList.add('js-menu-active'))
        })
    })
}

export { scroll }