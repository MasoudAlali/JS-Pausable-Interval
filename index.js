/********************************
 * Developer: Masoud Alali
 * @param callback
 * @param delay
 * @returns {PausableInterval}
 ********************************/

module.exports = function PausableInterval(callback, delay) {
	// Properties
	this.callback = callback;
	this.delay = delay;
	this.startDate = new Date();
	this.remaining = this.delay;
	this.currentInterval = null;
	this.currentTimeout = null;

	// Resume the Interval
	this.resume = function () {
		this.clear();
		this.currentTimeout = setTimeout((function () {
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
	};

	// Pause Interval until next resume call
	this.pause = function () {
		this.clear();
		this.remaining = this.delay - (new Date() - this.startDate);
		return this;
	};

	// Stop Interval and Clear Timers
	this.clear = function () {
		if (this.currentInterval) clearInterval(this.currentInterval);
		if (this.currentTimeout) clearTimeout(this.currentTimeout);
		return this;
	};

	// Change Callback for next Intervals
	this.changeCallback = function (callback) {
		if (!!callback && typeof callback === typeof function () {
		}) {
			this.callback = callback;
			return this;
		}
		throw TypeError('Provided Callback is not a Function');
	};

	// Change Delay for next loops
	this.changeDelay = function (delay) {
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
		throw TypeError('Delay should be a Number and bigger than 0');
	};

	// Pause Interval for specific amount of time (ms)
	this.pauseFor = function (ms) {
		if (!ms || typeof ms !== typeof 1 || ms < 0)
			throw TypeError('Milli Seconds should be a Number and bigger than 0');
		this.pause();
		setTimeout((function () {
			this.resume();
		}).bind(this), ms);
		return this;
	};

	// Initializing Properties
	this.changeCallback(callback);
	this.changeDelay(delay);

	return this.resume();
};
