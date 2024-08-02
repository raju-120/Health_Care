(function() {
  const VALUE_HTML = '<span class="odometer-value"></span>';
  const RIBBON_HTML = `<span class="odometer-ribbon"><span class="odometer-ribbon-inner">${VALUE_HTML}</span></span>`;
  const DIGIT_HTML = `<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">${RIBBON_HTML}</span></span>`;
  const FORMAT_MARK_HTML = '<span class="odometer-formatting-mark"></span>';
  const DIGIT_FORMAT = '(,ddd).dd';
  const FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;
  const FRAMERATE = 30;
  const DURATION = 2000;
  const COUNT_FRAMERATE = 20;
  const FRAMES_PER_VALUE = 2;
  const DIGIT_SPEEDBOOST = 0.5;
  const MS_PER_FRAME = 1000 / FRAMERATE;
  const COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;
  const TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
  const transitionCheckStyles = document.createElement('div').style;
  const TRANSITION_SUPPORT = 'transition' in transitionCheckStyles || 'webkitTransition' in transitionCheckStyles || 'mozTransition' in transitionCheckStyles || 'oTransition' in transitionCheckStyles;
  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  const createFromHTML = (html) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  const removeClass = (el, name) => {
    el.className = el.className.replace(new RegExp(`(^| )${name.split(' ').join('|')}( |$)`, 'gi'), ' ');
  };

  const addClass = (el, name) => {
    removeClass(el, name);
    el.className += ` ${name}`;
  };

  const trigger = (el, name) => {
    if (document.createEvent) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent(name, true, true);
      el.dispatchEvent(evt);
    }
  };

  const now = () => {
    return (window.performance && typeof window.performance.now === "function" ? window.performance.now() : Date.now());
  };

  const round = (val, precision = 0) => {
    if (!precision) {
      return Math.round(val);
    }
    val *= Math.pow(10, precision);
    val += 0.5;
    val = Math.floor(val);
    return val /= Math.pow(10, precision);
  };

  const truncate = (val) => {
    return val < 0 ? Math.ceil(val) : Math.floor(val);
  };

  const fractionalPart = (val) => {
    return val - round(val);
  };

  let _jQueryWrapped = false;

  const wrapJQuery = () => {
    if (_jQueryWrapped) {
      return;
    }
    if (window.jQuery) {
      _jQueryWrapped = true;
      ['html', 'text'].forEach((property) => {
        const old = window.jQuery.fn[property];
        window.jQuery.fn[property] = function(val) {
          if (val == null || !this[0]?.odometer) {
            return old.apply(this, arguments);
          }
          return this[0].odometer.update(val);
        };
      });
    }
  };

  setTimeout(wrapJQuery, 0);

  class Odometer {
    constructor(options) {
      this.options = options;
      this.el = this.options.el;
      if (this.el.odometer) {
        return this.el.odometer;
      }
      this.el.odometer = this;
      Object.entries(Odometer.options).forEach(([k, v]) => {
        if (this.options[k] == null) {
          this.options[k] = v;
        }
      });
      if (this.options.duration == null) {
        this.options.duration = DURATION;
      }
      this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
      this.resetFormat();
      this.value = this.cleanValue(this.options.value || '');
      this.renderInside();
      this.render();
      try {
        ['innerHTML', 'innerText', 'textContent'].forEach((property) => {
          if (this.el[property] != null) {
            Object.defineProperty(this.el, property, {
              get: () => {
                return property === 'innerHTML' ? this.inside.outerHTML : this.inside.innerText || this.inside.textContent;
              },
              set: (val) => {
                this.update(val);
              }
            });
          }
        });
      } catch (e) {
        this.watchForMutations();
      }
    }

    renderInside() {
      this.inside = document.createElement('div');
      this.inside.className = 'odometer-inside';
      this.el.innerHTML = '';
      this.el.appendChild(this.inside);
    }

    watchForMutations() {
      if (!MutationObserver) {
        return;
      }
      try {
        if (!this.observer) {
          this.observer = new MutationObserver((mutations) => {
            const newVal = this.el.innerText;
            this.renderInside();
            this.render(this.value);
            this.update(newVal);
          });
        }
        this.watchMutations = true;
        this.startWatchingMutations();
      } catch (e) {
        // handle error
      }
    }

    startWatchingMutations() {
      if (this.watchMutations) {
        this.observer.observe(this.el, {
          childList: true
        });
      }
    }

    stopWatchingMutations() {
      this.observer?.disconnect();
    }

    cleanValue(val) {
      if (typeof val === 'string') {
        val = val.replace(this.format.radix || '.', '<radix>');
        val = val.replace(/[.,]/g, '');
        val = val.replace('<radix>', '.');
        val = parseFloat(val, 10) || 0;
      }
      return round(val, this.format.precision);
    }

    bindTransitionEnd() {
      if (this.transitionEndBound) {
        return;
      }
      this.transitionEndBound = true;
      let renderEnqueued = false;
      TRANSITION_END_EVENTS.split(' ').forEach((event) => {
        this.el.addEventListener(event, () => {
          if (renderEnqueued) {
            return true;
          }
          renderEnqueued = true;
          setTimeout(() => {
            this.render();
            renderEnqueued = false;
            trigger(this.el, 'odometerdone');
          }, 0);
          return true;
        }, false);
      });
    }

    resetFormat() {
      const format = this.options.format || DIGIT_FORMAT || 'd';
      const parsed = FORMAT_PARSER.exec(format);
      if (!parsed) {
        throw new Error("Odometer: Unparsable digit format");
      }
      const [repeating, radix, fractional] = parsed.slice(1, 4);
      const precision = fractional?.length || 0;
      this.format = {
        repeating,
        radix,
        precision
      };
    }

    render(value) {
      value = value || this.value;
      this.stopWatchingMutations();
      this.resetFormat();
      this.inside.innerHTML = '';
      let theme = this.options.theme;
      const classes = this.el.className.split(' ').filter(cls => cls.length && !/^odometer(-|$)/.test(cls));
      const newClasses = [...classes, 'odometer'];
      if (!TRANSITION_SUPPORT) {
        newClasses.push('odometer-no-transitions');
      }
      if (theme) {
        newClasses.push(`odometer-theme-${theme}`);
      } else {
        newClasses.push('odometer-auto-theme');
      }
      this.el.className = newClasses.join(' ');
      this.ribbons = {};
      this.digits = [];
      const wholePart = !this.format.precision || !fractionalPart(value) || false;
      value.toString().split('').reverse().forEach((digit) => {
        if (digit === '.') {
          wholePart = true;
        }
        this.addDigit(digit, wholePart);
      });
      this.startWatchingMutations();
    }

    update(newValue) {
      newValue = this.cleanValue(newValue);
      const diff = newValue - this.value;
      if (!diff) {
        return;
      }
      removeClass(this.el, 'odometer-animating-up odometer-animating-down odometer-animating');
      if (diff > 0) {
        addClass(this.el, 'odometer-animating-up');
      } else {
        addClass(this.el, 'odometer-animating-down');
      }
      this.stopWatchingMutations();
      this.animate(newValue);
      this.startWatchingMutations();
      setTimeout(() => {
        this.el.offsetHeight;
        addClass(this.el, 'odometer-animating');
      }, 0);
      this.value = newValue;
    }

    renderDigit() {
      return createFromHTML(DIGIT_HTML);
    }

    insertDigit(digit, before) {
      if (before) {
        this.inside.insertBefore(digit, before);
      } else {
        this.inside.appendChild(digit);
      }
    }

    addSpacer(chr, before, extraClasses = '') {
      const spacer = createFromHTML(FORMAT_MARK_HTML);
      spacer.innerHTML = chr;
      if (extraClasses) {
        addClass(spacer, extraClasses);
      }
      this.insertDigit(spacer, before);
    }

    addDigit(value, repeating) {
      if (value === '-') {
        this.addSpacer(value, null, 'odometer-negation-mark');
        return;
      }
      if (value === '.') {
        this.addSpacer((this.format.radix || '.'), null, 'odometer-radix-mark');
        return;
      }
      if (repeating) {
        this.addSpacer(this.format.repeating, null, 'odometer-formatting-mark');
      }
      const digit = this.renderDigit();
      digit.querySelector('.odometer-value').innerHTML = value;
      this.digits.push(digit);
      this.insertDigit(digit);
    }

    animate(newValue) {
      if (!TRANSITION_SUPPORT || this.options.animation === 'count') {
        this.animateCount(newValue);
      } else {
        this.animateSlide(newValue);
      }
    }

    animateCount(newValue) {
      if (Math.abs(newValue - this.value) < 1) {
        const diff = newValue - this.value;
        this.value += diff;
        this.render();
        trigger(this.el, 'odometerdone');
        return;
      }
      const diff = newValue - this.value;
      const start = now();
      let last = start;
      const cur = this.value;
      const duration = this.options.duration;
      const tick = () => {
        const nowTime = now();
        const delta = nowTime - start;
        const fraction = delta / duration;
        const value = cur + diff * fraction;
        this.render(Math.round(value));
        if (delta > duration) {
          this.render(newValue);
          trigger(this.el, 'odometerdone');
          return;
        }
        if (delta - last >= COUNT_MS_PER_FRAME) {
          last = nowTime;
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    }

    animateSlide(newValue) {
      const diff = newValue - this.value;
      const digitCount = Math.ceil(Math.log(Math.abs(diff)) / Math.log(10));
      const start = now();
      const cur = this.value;
      const duration = this.options.duration;
      const ticks = [];
      const tickCount = Math.min(diff / digitCount / DIGIT_SPEEDBOOST, 1000);
      for (let i = 0; i < digitCount; i++) {
        ticks.push((diff / tickCount) * Math.pow(0.1, i));
      }
      const tick = () => {
        const nowTime = now();
        const delta = nowTime - start;
        const fraction = delta / duration;
        const value = cur + diff * fraction;
        this.render(Math.round(value));
        if (delta > duration) {
          this.render(newValue);
          trigger(this.el, 'odometerdone');
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  Odometer.options = {
    duration: 2000,
    animation: 'slide',
    theme: 'default',
    value: 0
  };

  window.Odometer = Odometer;
})();
