class PausingInterval {
    /********************************
     * @Developer: Masoud Alali
     * @param callback
     * @param delay
     * @returns {PausingInterval}
     ********************************/
    constructor(callback, delay) {
        // Properties
        this.callback = callback;
        this.delay = delay;
        this.startDate = new Date();
        this.remaining = this.delay;
        this.currentInterval = null;


        // Initializing Properties
        this.changeCallback(callback);
        this.changeDelay(delay);

        return this.resume();
    }

    /**
     * Pause Interval until next resume call
     * @returns {PausingInterval}
     */
    pause() {
        this.clear();
        this.remaining = this.delay - (new Date() - this.startDate);
        return this;
    }

    /**
     * Resume the Interval
     * @returns {PausingInterval}
     */
    resume() {
        this.clear();
        setTimeout((function () {
            this.startDate = new Date();
            this.callback();
            this.remaining = this.delay;
            this.currentInterval = setInterval((function () {
                this.startDate = new Date();
                this.callback();
            }).bind(this), this.delay);
        }).bind(this), this.remaining);
        this.startDate = new Date();
        return this;
    }

    /**
     * Stop Interval and Clear Timers
     * @returns {PausingInterval}
     */
    clear() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        return this;
    }

    /**
     * Change Callback for next Intervals
     * @param callback
     * @returns {PausingInterval}
     */
    changeCallback(callback) {
        if (!!callback && typeof callback === typeof function () {
        }) {
            this.callback = callback;
            return this;
        }
        throw TypeError("Provided Callback is not a Function");
    }

    /**
     * Change Delay for next loops
     * @param delay
     * @returns {PausingInterval}
     */
    changeDelay(delay) {
        if (!!delay && typeof delay === typeof 1 && delay > 0) {
            if (delay === this.delay) return;
            this.pause();
            if (delay > this.remaining)
                this.delay = delay;
            else {
                this.delay = delay;
                this.remaining = delay;
            }
            return this.resume();
        }
        throw TypeError("Delay should be a Number and bigger than 0");
    }

    /**
     * Pause Interval for specific amount of time (ms)
     * @param ms
     * @returns {PausingInterval}
     */
    pauseFor(ms) {
        if (!ms || typeof ms !== typeof 1 || ms < 0)
            throw TypeError("Milli Seconds should be a Number and bigger than 0");
        this.pause();
        setTimeout((function () {
            this.resume();
        }).bind(this), ms);
        return this;
    }
}
