'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * smoothscroll polyfill - v0.3.4
 * https://iamdustan.github.io/smoothscroll
 * 2016 (c) Dustan Kasten, Jeremias Menichelli - MIT License
 */

(function (w, d, undefined) {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   * undefined: undefined
   */

  // polyfill

  function polyfill() {
    // return when scrollBehavior interface is supported
    if ('scrollBehavior' in d.documentElement.style) {
      return;
    }

    /*
     * globals
     */
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * object gathering original scroll methods
     */
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    /*
     * define timing method
     */
    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} x
     * @returns {Boolean}
     */
    function shouldBailOut(x) {
      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' || x === null || x.behavior === undefined || x.behavior === 'auto' || x.behavior === 'instant') {
        // first arg not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior not valid');
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;
      var hasScrollableSpace;
      var hasVisibleOverflow;

      do {
        el = el.parentNode;

        // set condition variables
        isBody = el === d.body;
        hasScrollableSpace = el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth;
        hasVisibleOverflow = w.getComputedStyle(el, null).overflow === 'visible';
      } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));

      isBody = hasScrollableSpace = hasVisibleOverflow = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     */
    function step(context) {
      // call method again on next available frame
      context.frame = w.requestAnimationFrame(step.bind(w, context));

      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // return when end points have been reached
      if (currentX === context.x && currentY === context.y) {
        w.cancelAnimationFrame(context.frame);
        return;
      }
    }

    /**
     * scrolls window with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();
      var frame;

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // cancel frame when a scroll event's happening
      if (frame) {
        w.cancelAnimationFrame(frame);
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y,
        frame: frame
      });
    }

    /*
     * ORIGINAL METHODS OVERRIDES
     */

    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scroll.call(w, arguments[0].left || arguments[0], arguments[0].top || arguments[1]);
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left, ~~arguments[0].top);
    };

    // w.scrollBy
    w.scrollBy = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(w, arguments[0].left || arguments[0], arguments[0].top || arguments[1]);
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.elScroll.call(this, arguments[0].left || arguments[0], arguments[0].top || arguments[1]);
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(this, this, arguments[0].left, arguments[0].top);
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function () {
      var arg0 = arguments[0];

      if ((typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0)) === 'object') {
        this.scroll({
          left: arg0.left + this.scrollLeft,
          top: arg0.top + this.scrollTop,
          behavior: arg0.behavior
        });
      } else {
        this.scroll(this.scrollLeft + arg0, this.scrollTop + arguments[1]);
      }
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollIntoView.call(this, arguments[0] || true);
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
        // reveal parent in viewport
        w.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth'
        });
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }
})(window, document);
'use strict';

/*
 * App.js (in ES6, transpiled with Babel)
 */

(function () {

    var color = {
        red: '#e73d50',
        darkBlue: '#0a1e2c'
    };

    var scrollMagicController = new ScrollMagic.Controller();

    var scenes = {

        /* SCENE LISTS ----------------------------------------------------- */

        sceneLists: function sceneLists() {

            var sceneLists = document.querySelectorAll('.scene-list');

            sceneLists.forEach(function (list) {

                var listItems = list.querySelectorAll('.reveal'),
                    revealList = TweenMax.staggerFromTo(listItems, 0.5, { opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)",
                    ease: Power2.easeOut }, 0.1);

                var duration = 870;
                if (list.className.indexOf('scene-7') > -1) {
                    duration = 760;
                } else if (list.className.indexOf('scene-4') > -1) {
                    duration = 660;
                }

                var sceneList = new ScrollMagic.Scene({
                    triggerElement: list,
                    offset: duration + 240
                }).setTween(revealList)
                // .addIndicators({name:'reveal'})
                .addTo(scrollMagicController);

                var stickyList = new ScrollMagic.Scene({
                    triggerElement: list,
                    offset: -150,
                    duration: duration,
                    triggerHook: 'onLeave'
                }).setPin(list)
                // .addIndicators({name:'fix'})
                .addTo(scrollMagicController);
            });
        },

        drawLines: function drawLines() {

            var allScenes = document.querySelectorAll('.scene');

            allScenes.forEach(function (sceneObj) {

                var rule = sceneObj.querySelector('.scene-rule');
                if (rule.className.indexOf('no-draw') > -1) return;

                var drawRule = TweenMax.fromTo(rule, 1, { width: '0' }, { width: '100%', ease: Linear.easeNone }),
                    sceneOptions = {
                    triggerElement: sceneObj,
                    duration: '50%',
                    triggerHook: "onEnter"
                },
                    customOptions = rule.dataset.options ? JSON.parse(rule.dataset.options) : {};

                Object.assign(sceneOptions, customOptions);

                if (sceneObj.className.indexOf('scene-1') > -1) {
                    sceneOptions.offset = window.outerHeight / 2;
                    sceneOptions.triggerHook = "onCenter";
                }
                if (sceneObj.className.indexOf('scene-2') > -1) {
                    sceneOptions.triggerHook = "onLeave";
                }

                var scene = new ScrollMagic.Scene(sceneOptions).setTween(drawRule).addTo(scrollMagicController);
            });
        },

        /* HEADER SCENE ----------------------------------------------------- */

        headerScene: function headerScene() {

            var pulseTitle = TweenMax.fromTo('.site-header .site-title', 1, { opacity: 0.3, transform: 'translateY(40vh)' }, { opacity: 1, transform: 'translateY(40vh)', yoyo: true, repeat: 2, onComplete: function onComplete() {
                    TweenMax.fromTo('.site-header .site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' });
                } }),
                slideInCopy = TweenMax.fromTo('.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 3, ease: 'Quad.easeInOut', onComplete: function onComplete() {
                    var app = document.getElementById('app');
                    app.className = app.className.split('loading').join('') + 'initialized';
                } });
        },

        /* SCENE 1 ----------------------------------------------------------- */

        scene1: function scene1() {

            var button = document.querySelector('.scene-1__button'),
                showButton = TweenMax.fromTo(button, 0.5, { opacity: 0 }, { opacity: 1, onComplete: function onComplete() {
                    button.className += ' anim-pulse';
                } });

            var scene2 = new ScrollMagic.Scene({
                triggerElement: '.scene-1__button',
                offset: '-24px'
            }).setTween(showButton).addTo(scrollMagicController);
        },

        /* SCENE 2 ----------------------------------------------------------- */

        scene2: function scene2() {

            var directoryListItems = TweenMax.staggerFromTo('.scene-directory li', 0.5, { opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)",
                ease: Power2.easeOut }, 0.1),
                slideCurtain = TweenMax.fromTo('.scene-2__image.curtain', 1, { y: '180px' }, { y: 0, ease: Linear.easeNone }),
                timeline = new TimelineMax(),
                showExplorer = TweenMax.fromTo('.scene-2__image.man', 0.5, { x: '100px', opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut }),
                showLight = TweenMax.fromTo('.scene-2__image.light', 0.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut });

            timeline.add(showExplorer).add(showLight);

            var showDirectory = new ScrollMagic.Scene({
                triggerElement: '#scene-3',
                triggerHook: "onEnter"
            }).setTween(directoryListItems).addTo(scrollMagicController);

            var curtain = new ScrollMagic.Scene({
                triggerElement: '.scene-2__images',
                duration: window.innerHeight * 0.35,
                triggerHook: "onEnter"
            }).setTween(slideCurtain).addTo(scrollMagicController);

            var explorer = new ScrollMagic.Scene({
                triggerElement: '.scene-2__images',
                offset: window.innerHeight * 0.35,
                triggerHook: "onEnter"
            }).setTween(timeline).addTo(scrollMagicController);

            var stickyBg = new ScrollMagic.Scene({
                triggerElement: '#scene-2',
                duration: '200%',
                triggerHook: "onLeave"
            }).setPin('.scene-2__background').addTo(scrollMagicController);
        },

        /* SCENE 3 ----------------------------------------------------------- */

        scene3: function scene3() {

            var scene = new ScrollMagic.Scene({
                triggerElement: '.scene-3__images',
                duration: 900
            }).setTween('.scene-3__image.man', { y: '20%', ease: Linear.easeNone }).addTo(scrollMagicController);

            var scene2 = new ScrollMagic.Scene({
                triggerElement: '.scene-3__images',
                duration: 900
            }).setTween('.scene-3__image.lines', { y: '-10%', ease: Linear.easeNone }).addTo(scrollMagicController);
        },

        /* SCENE 4 ----------------------------------------------------------- */

        scene4: function scene4() {

            var expandImage = TweenMax.fromTo('.scene-4__image.small-man', 1, { transform: 'scale(0.3)' }, { transform: 'scale(1)', transformOrigin: '50% bottom', ease: Linear.easeNone }),
                shrinkImage = TweenMax.fromTo('.scene-4__image.big-man', 1, { transform: 'scale(1)' }, { transform: 'scale(0.3)', transformOrigin: '50% bottom', ease: Linear.easeNone }),
                scene = new ScrollMagic.Scene({
                triggerElement: '.scene-4__images',
                offset: 250,
                duration: window.outerHeight / 2
            }).setTween(expandImage).addTo(scrollMagicController),
                scene2 = new ScrollMagic.Scene({
                triggerElement: '.scene-4__images',
                offset: 250,
                duration: window.outerHeight / 2
            }).setTween(shrinkImage).addTo(scrollMagicController);
        },

        /* SCENE 5 ----------------------------------------------------------- */

        scene5: function scene5() {

            var rotateLight = TweenMax.fromTo('.scene-5__image.light', 1, { rotation: 30 }, { rotation: 0, transformOrigin: '523px 83px', ease: Linear.easeNone }),
                scene2 = new ScrollMagic.Scene({
                triggerElement: '.scene-5__images',
                duration: window.innerHeight + 900,
                triggerHook: "onEnter"
            }).setTween(rotateLight).addTo(scrollMagicController);

            var revealImage = TweenMax.fromTo('.scene-5__image.man', 1, { transform: 'translateX(150px)' }, { transform: 'translateX(0)', ease: Linear.easeNone }),
                scene3 = new ScrollMagic.Scene({
                triggerElement: '.scene-5__images',
                duration: window.innerHeight + 900,
                triggerHook: "onEnter"
            }).setTween(revealImage).addTo(scrollMagicController);
        },

        /* SCENE 6 ----------------------------------------------------------- */

        scene6: function scene6() {

            var manGoesRight = TweenMax.fromTo('.scene-6__image.man', 1, { left: '30%' }, { left: '60%', ease: Linear.easeNone });
            var womanGoesLeft = TweenMax.fromTo('.scene-6__image.woman', 1, { right: '30%' }, { right: '60%', ease: Linear.easeNone });

            var manScene = new ScrollMagic.Scene({
                triggerElement: '.scene-6__images',
                duration: window.innerHeight + 570,
                offset: window.innerHeight * -0.5
            }).setTween(manGoesRight).addTo(scrollMagicController);

            var womanScene = new ScrollMagic.Scene({
                triggerElement: '.scene-6__images',
                duration: window.innerHeight + 508,
                offset: window.innerHeight * -0.5
            }).setTween(womanGoesLeft).addTo(scrollMagicController);
        },

        /* SCENE 7 ----------------------------------------------------------- */

        scene7: function scene7() {

            var tween = TweenMax.fromTo('.scene-7__image.mark', 1, { y: '10%', opacity: '0' }, { y: '0%', opacity: '1', ease: Linear.easeNone }),
                scene = new ScrollMagic.Scene({
                triggerElement: '.scene-7__images',
                duration: 450
            }).setTween(tween).addTo(scrollMagicController);
        },

        /* SCENE 8 ----------------------------------------------------------- */

        scene8: function scene8() {

            var timeline = new TimelineMax(),
                clipper = TweenMax.fromTo('.scene-image.clipper', 0.15, { y: '50px', opacity: '0' }, { y: '0', opacity: '1', ease: Quad.easeOut }),
                hose = TweenMax.fromTo('.scene-image.hose', 0.15, { x: '-50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut }),
                ladder = TweenMax.fromTo('.scene-image.ladder', 0.15, { x: '50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut }),
                trimmer = TweenMax.fromTo('.scene-image.trimmer', 0.15, { x: '-50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut }),
                waterer = TweenMax.fromTo('.scene-image.waterer', 0.15, { x: '50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut });

            timeline.add(clipper).add(hose).add(ladder).add(trimmer).add(waterer);

            var scene = new ScrollMagic.Scene({
                triggerElement: '.scene-8__images',
                triggerHook: 'onLeave'
            }).setTween(timeline).addTo(scrollMagicController);
        },

        /* SCENE 9 ----------------------------------------------------------- */

        scene9: function scene9() {}

    }; // scenes

    // loop through each key in {scenes}
    Object.keys(scenes).forEach(function (fn) {
        // check to see if it's a function
        if (typeof scenes[fn] === "function") scenes[fn]();
    });
})();