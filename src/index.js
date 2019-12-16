import './scss/main.scss'

import { setParallax } from './scripts/Parallax'
import { Menu } from './scripts/Menu'
import * as Anims from './scripts/Animations'

window.onload = () => {
    Anims.loader('.transition')
    Menu()
    setParallax()
}