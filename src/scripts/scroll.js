// Tools
import normalizeWheel from "normalize-wheel"
import Hammer from "hammerjs"

// This class normalize scroll and wheel events so it's not possible to spam scroll or have different behaviors between devices (trackpad/mouse/screentouch)
export class Scroll {
    constructor() {
        this.wheeling = true
        this.triggered = false
        this.recentlyTriggered = false

        this.direction = 0
        this.previousValue = 0

        this.slide = {
            current: 0,
            min: 0,
            max: 3
        }

        this.lastTriggerTimeout = null
        this.idleTimeout = null
        this.hammerManager = null

        this.container = document.querySelectorAll('.container')

        this.init()
    }

    init() {
        this.hammerManager = new Hammer.Manager(
            document.body, {
            recognizers: [
                [Hammer.Pan, {
                    threshold: 0,
                    pointers: 0
                }],
            ],
        },
        )

        // document.addEventListener(
        //     /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel",
        //     (_e) => {
        //         this.debounce(
        //             this.onMouseWheel(_e),
        //             750
        //         )
        //     }, {
        //     passive: true
        //     }
        // )

        // this.hammerManager.on('pan',
        //     (_e) => {
        //         console.log(_e)
        //         this.debounce(
        //             this.onMouseWheel(_e, true),
        //             750
        //         )
        //     }, {
        //     passive: true
        //     }
        // )
    }

    debounce(fn, time) {
        let timeout

        return function() {
            const functionCall = () => fn.apply(this, arguments)
            
            clearTimeout(timeout)
            timeout = setTimeout(functionCall, time)
        }
    }

    counter(decrease) {
        if (decrease) {
            if (this.slide.current > 0) {
                this.slide.current--
            }
            else {
                this.slide.current = this.slide.max
            }
        }
        else {
            if (this.slide.current < this.slide.max) {
                this.slide.current++
            }
            else {
                this.slide.current = this.slide.min
            }
        }
    }

    // This is the function called on wheel event
    onWheel(_direction) {

        if (this.wheeling && this.direction > 0) {
            this.counter()
            document.querySelector('.main').style.transform = `translateY(-${this.slide.current}00vh)`
            document.querySelectorAll('.section').forEach(cases => cases.classList.add('case__initial'))
            document.querySelector(`.case--${this.slide.current}`).classList.remove('case__initial')
            // console.log('down :' + this.currentSlide)
        }
        else if (this.wheeling && this.direction < 0) {
            this.counter(true)
            document.querySelector('.main').style.transform = `translateY(-${this.slide.current}00vh)`
            document.querySelectorAll('.section').forEach(cases => cases.classList.add('case__initial'))
            document.querySelector(`.case--${this.slide.current}`).classList.remove('case__initial')
            // console.log('up :' + this.currentSlide)
        }
    }

    onMouseWheel(_e, _ispan) {
        this.triggered = false

        // Get normalized value
        const normalized = normalizeWheel(_e)

        this.triggered =
            this.testWheelByDirection(normalized.pixelY) ||
            this.testWheelByIdle() ||
            this.testWheelByIncrease(normalized.pixelY)

        if (this.triggered) {
            if (_ispan) {
                this.onWheel(this.direction * (-1))
            }
            else {
                this.onWheel(this.direction)
            }

            this.recentlyTriggered = true

            // Clear current timeout
            if (this.lastTriggerTimeout) window.clearTimeout(this.lastTriggerTimeout)

            this.lastTriggerTimeout = window.setTimeout(() => {
                this.recentlyTriggered = false
            }, 750)
        }
    }

    testWheelByDirection(_value) {
        let result = false

        // Get direction
        const direction = Math.sign(_value)

        // Direction changed
        if (direction !== this.direction) result = true

        // Save direction
        this.direction = direction

        return result
    }

    testWheelByIdle() {
        let result = false

        // Clear current timeout
        if (this.idleTimeout) window.clearTimeout(this.idleTimeout)

        // Start new timeout
        this.idleTimeout = window.setTimeout(() => {
            this.wheeling = false
        }, 750)

        if (!this.wheeling) result = true

        this.wheeling = true

        return result
    }

    testWheelByIncrease(_value) {
        let result = false
        const sign = Math.sign(_value)

        if (!this.recentlyTriggered) {
            if (sign > 0 && _value > this.previousValue * 2) result = true

            if (sign < 0 && _value < this.previousValue * 2) result = true
        }

        this.previousValue = _value

        return result
    }
}