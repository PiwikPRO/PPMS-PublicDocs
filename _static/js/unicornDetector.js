(function(window) {
    var Detector = function(options) {
        this._options = {
            checkOnLoad:		false,
            resetOnEnd:			false,
            loopCheckTime:		50,
            loopMaxNumber:		5,
            baitClass:			'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
            baitStyle:			'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;',
        };
        this._var = {
            version:			'3.2.1',
            bait:				null,
            checking:			false,
            loop:				null,
            loopNumber:			0,
            event:				{ detected: [], notDetected: [] }
        };
        if(options !== undefined) {
            this.setOption(options);
        }
        var self = this;
        var eventCallback = function() {
            setTimeout(function() {
                if(self._options.checkOnLoad === true) {
                    if(self._var.bait === null) {
                        self._creatBait();
                    }
                    setTimeout(function() {
                        self.check();
                    }, 1);
                }
            }, 1);
        };
        if(window.addEventListener !== undefined) {
            window.addEventListener('load', eventCallback, false);
        } else {
            window.attachEvent('onload', eventCallback);
        }
    };
    Detector.prototype._options = null;
    Detector.prototype._var = null;
    Detector.prototype._bait = null;

    Detector.prototype.setOption = function(options, value) {
        if(value !== undefined) {
            var key = options;
            options = {};
            options[key] = value;
        }
        for(var option in options) {
            this._options[option] = options[option];
        }
        return this;
    };

    Detector.prototype._creatBait = function() {
        var bait = document.createElement('div');
        bait.setAttribute('class', this._options.baitClass);
        bait.setAttribute('style', this._options.baitStyle);
        this._var.bait = window.document.body.appendChild(bait);

        this._var.bait.offsetParent;
        this._var.bait.offsetHeight;
        this._var.bait.offsetLeft;
        this._var.bait.offsetTop;
        this._var.bait.offsetWidth;
        this._var.bait.clientHeight;
        this._var.bait.clientWidth;

    };
    Detector.prototype._destroyBait = function() {
        window.document.body.removeChild(this._var.bait);
        this._var.bait = null;

    };

    Detector.prototype.check = function(loop) {
        if(loop === undefined) {
            loop = true;
        }

        if(this._var.checking === true) {
            return false;
        }
        this._var.checking = true;

        if(this._var.bait === null) {
            this._creatBait();
        }

        var self = this;
        this._var.loopNumber = 0;
        if(loop === true) {
            this._var.loop = setInterval(function() {
                self._checkBait(loop);
            }, this._options.loopCheckTime);
        }
        setTimeout(function() {
            self._checkBait(loop);
        }, 1);

        return true;
    };
    Detector.prototype._checkBait = function(loop) {
        var detected = false;

        if(this._var.bait === null) {
            this._creatBait();
        }

        if(window.document.body.getAttribute('abp') !== null
            || this._var.bait.offsetParent === null
            || this._var.bait.offsetHeight == 0
            || this._var.bait.offsetLeft == 0
            || this._var.bait.offsetTop == 0
            || this._var.bait.offsetWidth == 0
            || this._var.bait.clientHeight == 0
            || this._var.bait.clientWidth == 0) {
            detected = true;
        }
        if(window.getComputedStyle !== undefined) {
            var baitTemp = window.getComputedStyle(this._var.bait, null);
            if(baitTemp && (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden')) {
                detected = true;
            }
        }

        if(loop === true) {
            this._var.loopNumber++;
            if(this._var.loopNumber >= this._options.loopMaxNumber) {
                this._stopLoop();
            }
        }

        if(detected === true) {
            this._stopLoop();
            this._destroyBait();
            this.emitEvent(true);
            if(loop === true) {
                this._var.checking = false;
            }
        } else if(this._var.loop === null || loop === false) {
            this._destroyBait();
            this.emitEvent(false);
            if(loop === true) {
                this._var.checking = false;
            }
        }
    };
    Detector.prototype._stopLoop = function(detected) {
        clearInterval(this._var.loop);
        this._var.loop = null;
        this._var.loopNumber = 0;
    };

    Detector.prototype.emitEvent = function(detected) {

        var fns = this._var.event[(detected===true?'detected':'notDetected')];
        for(var i in fns) {
            if(fns.hasOwnProperty(i)) {
                fns[i]();
            }
        }
        if(this._options.resetOnEnd === true) {
            this.clearEvent();
        }
        return this;
    };
    Detector.prototype.clearEvent = function() {
        this._var.event.detected = [];
        this._var.event.notDetected = [];
    };

    Detector.prototype.on = function(detected, fn) {
        this._var.event[(detected===true?'detected':'notDetected')].push(fn);

        return this;
    };
    Detector.prototype.onDetected = function(fn) {
        return this.on(true, fn);
    };
    Detector.prototype.onNotDetected = function(fn) {
        return this.on(false, fn);
    };

    window.detectionOfStuff = Detector;
    if(window.unicornDetector === undefined) {
        window.unicornDetector = new detectionOfStuff({
            checkOnLoad: true,
            resetOnEnd: true
        });
    }
})(window);
