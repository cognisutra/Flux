(function (global) {
  'use strict';

  var defaultOptions = {
    offset: 120,
    delay: 0,
    duration: 600,
    easing: 'ease-out-cubic',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
    disable: false
  };

  var easings = {
    'linear': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
    'ease': 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
    'ease-in': 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
    'ease-out': 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
    'ease-in-out': 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
    'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
    'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
    'ease-out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'ease-in-out-expo': 'cubic-bezier(0.870, 0.000, 0.130, 1.000)',
    'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    'ease-in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
  };

  function FluxInstance(options) {
    this.options = extend({}, defaultOptions, options);
    this.elements = [];
    this.isScrolling = false;
    this.initialised = false;

    if (this.options.disable) return;

    this.init();
  }

  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          out[key] = obj[key];
        }
      }
    }
    return out;
  }

  FluxInstance.prototype.init = function () {
    var self = this;
    this.elements = [];
    var nodes = document.querySelectorAll('[data-aos]');

    if (!nodes.length) return;

    [].forEach.call(nodes, function (el) {
      if (el._fluxInitialised) return;
      el._fluxInitialised = true;

      var duration = el.getAttribute('data-aos-duration') || self.options.duration;
      var delay = el.getAttribute('data-aos-delay') || self.options.delay;
      var easing = el.getAttribute('data-aos-easing') || self.options.easing;
      var cssEasing = easings[easing] || easing;

      el.style.transition = 'all ' + duration + 'ms ' + cssEasing + ' ' + delay + 'ms';

      self.elements.push(el);
    });

    this.initialised = true;
    this._onScroll();
    this._bindEvents();
  };

  FluxInstance.prototype._bindEvents = function () {
    var self = this;
    window.addEventListener('scroll', function () {
      self._onScroll();
    });
    window.addEventListener('resize', function () {
      self._onScroll();
    });
  };

  FluxInstance.prototype._onScroll = function () {
    var self = this;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(function () {
      self._handleScroll();
    });
  };

  FluxInstance.prototype._handleScroll = function () {
    var windowHeight = window.innerHeight;

    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];

      if (!el || !el.parentNode) {
        this.elements.splice(i, 1);
        i--;
        continue;
      }

      var rect = el.getBoundingClientRect();
      var once = el.getAttribute('data-aos-once') !== null ? true : this.options.once;
      var mirror = el.getAttribute('data-aos-mirror') !== null ? true : this.options.mirror;
      var offset = parseInt(el.getAttribute('data-aos-offset')) || this.options.offset;
      var placement = el.getAttribute('data-aos-anchor-placement') || this.options.anchorPlacement;
      var parts = placement.split('-');
      var elPos = parts[0];
      var rootPos = parts[1];
      var shouldAnimate = false;

      var elRef;
      if (elPos === 'top') elRef = rect.top;
      else if (elPos === 'center') elRef = rect.top + rect.height / 2;
      else elRef = rect.bottom;

      var rootRef;
      if (rootPos === 'top') rootRef = 0;
      else if (rootPos === 'center') rootRef = windowHeight / 2;
      else rootRef = windowHeight;

      shouldAnimate = elRef <= rootRef + offset;

      if (shouldAnimate) {
        el.classList.add('aos-animate');
      } else {
        if (mirror && !once) {
          el.classList.remove('aos-animate');
        }
      }
    }
  };

  FluxInstance.prototype.refresh = function () {
    this.elements = [];
    var nodes = document.querySelectorAll('[data-aos]');
    var self = this;
    [].forEach.call(nodes, function (el) {
      el._fluxInitialised = false;
    });
    this.init();
  };

  FluxInstance.prototype.destroy = function () {
    this.elements = [];
    this.initialised = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  };

  FluxInstance.prototype.reset = function () {
    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];
      if (el) el.classList.remove('aos-animate');
    }
  };

  FluxInstance.prototype.replay = function () {
    this.reset();
    void document.body.offsetHeight;
    var self = this;
    setTimeout(function () {
      self._handleScroll();
    }, 60);
  };

  var activeInstance = null;

  global.Flux = {
    init: function (options) {
      if (!activeInstance) {
        activeInstance = new FluxInstance(options || {});
      }
      return activeInstance;
    },
    refresh: function () {
      if (activeInstance) activeInstance.refresh();
    },
    destroy: function () {
      if (activeInstance) activeInstance.destroy();
      activeInstance = null;
    },
    replay: function () {
      if (activeInstance) activeInstance.replay();
    },
    reset: function () {
      if (activeInstance) activeInstance.reset();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.querySelector('[data-aos]')) {
        Flux.init();
      }
    });
  } else {
    if (document.querySelector('[data-aos]')) {
      Flux.init();
    }
  }

})(typeof window !== 'undefined' ? window : this);
