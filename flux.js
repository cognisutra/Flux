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
    disable: false,
    reducedMotion: false,
    stagger: 0,
    debug: false,
    presets: {}
  };

  var p = {
    subtle: { animation: 'fade-up', duration: 400, easing: 'ease' },
    smooth: { animation: 'fade-up', duration: 800, easing: 'ease-out-cubic' },
    dramatic: { animation: 'zoom-in', duration: 800, easing: 'ease-out-back' },
    bouncy: { animation: 'bounce-in', duration: 900, easing: 'ease-out-cubic' },
    energetic: { animation: 'spring-up', duration: 800, easing: 'ease-out-cubic' },
    reveal: { animation: 'reveal-left', duration: 700, easing: 'ease' },
    focus: { animation: 'zoom-in', duration: 600, easing: 'ease-out-quart' },
    floaty: { animation: 'float', duration: 1200, easing: 'ease' }
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

  var lastScrollY = 0;
  var debugOverlay = null;
  var debugVisible = false;

  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) out[key] = obj[key];
      }
    }
    return out;
  }

  function isReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isDisabled(opt) {
    if (!opt) return false;
    if (opt === true) return true;
    var w = window.innerWidth;
    var list = typeof opt === 'string' ? opt.split(',') : opt;
    for (var i = 0; i < list.length; i++) {
      var v = list[i].trim().toLowerCase();
      if (v === 'mobile' && w < 768) return true;
      if (v === 'tablet' && w < 1024) return true;
      if (v === 'desktop' && w >= 1024) return true;
    }
    return false;
  }

  function resolveAnchor(anchorId) {
    if (!anchorId) return null;
    return document.querySelector(anchorId) || document.getElementById(anchorId.replace('#', '')) || null;
  }

  function parsePlacement(s) {
    var parts = s.split('-');
    return { elPos: parts[0] || 'top', rootPos: parts[1] || 'bottom' };
  }

  function computeRef(el, elPos, rootPos, anchorEl) {
    var target = anchorEl || el;
    var rect = target.getBoundingClientRect();
    var elRef;
    if (elPos === 'top') elRef = rect.top;
    else if (elPos === 'center') elRef = rect.top + rect.height / 2;
    else elRef = rect.bottom;
    var rootRef;
    if (rootPos === 'top') rootRef = 0;
    else if (rootPos === 'center') rootRef = window.innerHeight / 2;
    else rootRef = window.innerHeight;
    return { elRef: elRef, rootRef: rootRef, rect: rect };
  }

  function fireCallback(str) {
    if (!str) return;
    if (typeof global[str] === 'function') global[str]();
    else if (str.indexOf('(') > -1) { try { eval(str); } catch (e) {} }
  }

  function createDebugOverlay() {
    var d = document.createElement('div');
    d.id = '_flux_debug';
    d.style.cssText = 'position:fixed;top:0;right:0;width:360px;max-height:100vh;overflow-y:auto;z-index:99999;background:#0c0c14;border-left:1px solid rgba(255,255,255,0.08);padding:1rem;font-family:monospace;font-size:11px;color:#c8c8d0;display:none';
    d.innerHTML = '<div style="font-weight:700;margin-bottom:0.75rem;color:#fff;font-size:13px">Flux Debug</div><div id="_flux_debug_body"></div>';
    document.body.appendChild(d);
    return d;
  }

  function updateDebug(inst) {
    if (!debugOverlay) debugOverlay = createDebugOverlay();
    debugOverlay.style.display = debugVisible ? 'block' : 'none';
    if (!debugVisible) return;
    var body = debugOverlay.querySelector('#_flux_debug_body');
    var html = '';
    html += '<div style="margin-bottom:0.5rem;color:#555">' + inst.elements.length + ' elements tracked</div>';
    for (var i = 0; i < inst.elements.length && i < 50; i++) {
      var el = inst.elements[i];
      if (!el) continue;
      var tag = el.tagName.toLowerCase();
      var id = el.id ? '#' + el.id : '';
      var cls = el.className ? '.' + el.className.split(' ').filter(function(c){return c&&c!=='aos-animate'}).join('.') : '';
      var anim = el.getAttribute('data-aos') || '';
      var active = el.classList.contains('aos-animate');
      var label = tag + id + (cls.length > 20 ? cls.slice(0, 20) + '..' : cls);
      html += '<div style="padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.03);display:flex;align-items:center;gap:0.4rem">';
      html += '<span style="width:8px;height:8px;border-radius:50%;background:' + (active ? '#34d399' : '#444') + ';flex-shrink:0"></span>';
      html += '<span style="color:#888;font-size:10px;flex-shrink:0">' + anim + '</span> ';
      html += '<span style="color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + label + '</span>';
      html += '</div>';
    }
    if (inst.elements.length > 50) html += '<div style="color:#555;padding:0.3rem 0">+ ' + (inst.elements.length - 50) + ' more</div>';
    body.innerHTML = html;
  }

  function FluxInstance(options) {
    this.options = extend({}, defaultOptions, options);
    this.elements = [];
    this.groups = {};
    this.initialised = false;

    if (this.options.disable === true) return;
    if (isReduced() && !options.reducedMotion) {
      this.options.duration = 1;
      this.options.delay = 0;
    }
    if (isDisabled(this.options.disable)) return;

    this.init();
  }

  FluxInstance.prototype.init = function () {
    var self = this;
    this.elements = [];
    this.groups = {};
    var nodes = document.querySelectorAll('[data-aos]');
    if (!nodes.length) return;

    var staggerParents = {};

    [].forEach.call(nodes, function (el) {
      if (el._fluxInitialised) {
        self.elements.push(el);
        return;
      }
      el._fluxInitialised = true;

      var opts = self._resolveOptions(el);
      var cssEasing = easings[opts.easing] || opts.easing;
      var tDuration = opts.duration;
      var tDelay = opts.delay;

      var parent = el.parentNode;
      while (parent) {
        var sg = parent.getAttribute && parent.getAttribute('data-aos-stagger');
        if (sg !== null) {
          if (!staggerParents[parent._fluxStaggerId]) {
            parent._fluxStaggerId = parent._fluxStaggerId || Math.random().toString(36).slice(2);
            staggerParents[parent._fluxStaggerId] = { parent: parent, stagger: parseInt(sg) || self.options.stagger };
          }
          var children = parent.querySelectorAll(':scope > [data-aos]');
          var idx = 0;
          [].forEach.call(children, function (c, ci) {
            if (c === el) { idx = ci; }
          });
          tDelay += idx * staggerParents[parent._fluxStaggerId].stagger;
        }
        parent = parent.parentNode;
      }

      el.style.transition = 'all ' + tDuration + 'ms ' + cssEasing + ' ' + tDelay + 'ms';
      el._fluxOpts = opts;

      if (opts.group) {
        if (!self.groups[opts.group]) self.groups[opts.group] = [];
        self.groups[opts.group].push(el);
      }

      self.elements.push(el);
    });

    this.initialised = true;
    this._onScroll();
    this._bindEvents();
    if (this.options.debug) { debugVisible = true; updateDebug(this); }
  };

  FluxInstance.prototype._resolveOptions = function (el) {
    var o = {};
    var preset = el.getAttribute('data-aos-preset');
    if (preset) {
      var pr = this.options.presets[preset] || p[preset];
      if (pr) {
        if (pr.animation) o.animation = pr.animation;
        if (pr.duration) o.duration = pr.duration;
        if (pr.easing) o.easing = pr.easing;
        if (pr.delay) o.delay = pr.delay;
        if (pr.offset) o.offset = pr.offset;
      }
    }

    o.animation = el.getAttribute('data-aos') || o.animation || '';
    o.duration = parseInt(el.getAttribute('data-aos-duration')) || o.duration || this.options.duration;
    o.delay = parseInt(el.getAttribute('data-aos-delay')) || o.delay || this.options.delay;
    o.easing = el.getAttribute('data-aos-easing') || o.easing || this.options.easing;
    o.offset = parseInt(el.getAttribute('data-aos-offset')) || o.offset || this.options.offset;
    o.once = el.hasAttribute('data-aos-once') ? true : this.options.once;
    o.mirror = el.hasAttribute('data-aos-mirror') ? true : this.options.mirror;
    o.anchorPlacement = el.getAttribute('data-aos-anchor-placement') || this.options.anchorPlacement;
    o.anchor = el.getAttribute('data-aos-anchor');
    o.group = el.getAttribute('data-aos-group') || null;
    o.onStart = el.getAttribute('data-aos-on-start') || null;
    o.onEnd = el.getAttribute('data-aos-on-end') || null;
    o.animateOut = el.getAttribute('data-aos-animate-out');

    if (this.options.reducedMotion || isReduced()) {
      o.duration = 1;
      o.delay = 0;
    }

    return o;
  };

  FluxInstance.prototype._bindEvents = function () {
    var self = this;
    window.addEventListener('scroll', function () { self._onScroll(); });
    window.addEventListener('resize', function () { self._onScroll(); });
    if (this.options.debug) {
      document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
          debugVisible = !debugVisible;
          updateDebug(self);
        }
      });
    }
  };

  FluxInstance.prototype._onScroll = function () {
    var self = this;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(function () {
      self._handleScroll();
    });
  };

  FluxInstance.prototype._handleScroll = function () {
    var wh = window.innerHeight;
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    var groupTriggered = {};

    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];
      if (!el || !el.parentNode) {
        this.elements.splice(i, 1);
        i--;
        continue;
      }

      var opts = el._fluxOpts || this._resolveOptions(el);
      el._fluxOpts = opts;
      var placement = parsePlacement(opts.anchorPlacement);
      var anchorEl = opts.anchor ? resolveAnchor(opts.anchor) : null;

      var ref = computeRef(el, placement.elPos, placement.rootPos, anchorEl);
      var shouldAnimate = ref.elRef <= ref.rootRef + opts.offset;

      if (opts.group && groupTriggered[opts.group]) {
        shouldAnimate = true;
      }

      if (shouldAnimate) {
        if (!el.classList.contains('aos-animate')) {
          el.classList.add('aos-animate');
          if (opts.onStart) fireCallback(opts.onStart);
          if (opts.onEnd) {
            var onEnd = opts.onEnd;
            var handler = function () {
              el.removeEventListener('transitionend', handler);
              el.removeEventListener('animationend', handler);
              fireCallback(onEnd);
            };
            el.addEventListener('transitionend', handler);
            el.addEventListener('animationend', handler);
          }
          if (opts.group && !groupTriggered[opts.group]) {
            groupTriggered[opts.group] = true;
            var group = this.groups[opts.group];
            if (group) {
              for (var g = 0; g < group.length; g++) {
                var ge = group[g];
                if (ge !== el && !ge.classList.contains('aos-animate')) {
                  ge.classList.add('aos-animate');
                  var gopts = ge._fluxOpts;
                  if (gopts && gopts.onStart) fireCallback(gopts.onStart);
                }
              }
            }
          }
        }
      } else {
        var canRemove = false;
        if (opts.animateOut) {
          canRemove = true;
        } else if (opts.mirror && !opts.once) {
          canRemove = true;
        }
        if (canRemove) {
          if (el.classList.contains('aos-animate')) {
            el.classList.remove('aos-animate');
          }
        }
      }
    }

    if (debugVisible) updateDebug(this);
  };

  FluxInstance.prototype.refresh = function () {
    this.elements = [];
    this.groups = {};
    var nodes = document.querySelectorAll('[data-aos]');
    [].forEach.call(nodes, function (el) { el._fluxInitialised = false; });
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
    setTimeout(function () { self._handleScroll(); }, 60);
  };

  FluxInstance.prototype.debug = function (show) {
    debugVisible = show !== undefined ? !!show : !debugVisible;
    if (!debugOverlay) debugOverlay = createDebugOverlay();
    updateDebug(this);
  };

  var activeInstance = null;

  global.Flux = {
    init: function (options) {
      if (!activeInstance) activeInstance = new FluxInstance(options || {});
      return activeInstance;
    },
    refresh: function () { if (activeInstance) activeInstance.refresh(); },
    destroy: function () { if (activeInstance) activeInstance.destroy(); activeInstance = null; },
    replay: function () { if (activeInstance) activeInstance.replay(); },
    reset: function () { if (activeInstance) activeInstance.reset(); },
    debug: function (show) { if (activeInstance) activeInstance.debug(show); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.querySelector('[data-aos]')) Flux.init();
    });
  } else {
    if (document.querySelector('[data-aos]')) Flux.init();
  }

})(typeof window !== 'undefined' ? window : this);
