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

    var headerScene = function headerScene() {

        var pulseTitle = TweenMax.fromTo('.site-title', 1, { opacity: 0.3, transform: 'translateY(40vh)' }, { opacity: 1, transform: 'translateY(40vh)', yoyo: true, repeat: 2, onComplete: function onComplete() {
                TweenMax.fromTo('.site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' });
            } }),
            slideInCopy = TweenMax.fromTo('.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 3, ease: 'Quad.easeInOut', onComplete: function onComplete() {
                var app = document.getElementById('app');
                app.className = app.className.split('loading').join('') + 'initialized';
            } });
    };headerScene();

    /* SCENE 1 ----------------------------------------------------------- */

    var scene1 = function scene1() {

        var timeline = new TimelineMax(),
            drawLine = TweenMax.fromTo('.scene-1__rule', 1, { width: '0' }, { width: '100%' }),
            showButton = TweenMax.fromTo('.scene-1__button', 1, { opacity: 0 }, { opacity: 1 });

        timeline.add(drawLine).add(showButton);

        // Create the Scene and trigger when visible with ScrollMagic
        var scene = new ScrollMagic.Scene({
            triggerElement: '#scene-1',
            offset: window.outerHeight / 2,
            duration: '50%'
        }).setTween(timeline)
        // .addIndicators()
        .addTo(scrollMagicController);
    };scene1();

    /* SCENE 2 ----------------------------------------------------------- */

    var scene2 = function scene2() {

        var timeline = new TimelineMax(),
            drawLine = TweenMax.fromTo('.scene-2__rule', 1, { width: '0' }, { width: '100%' }),
            showimage = TweenMax.fromTo('.scene-2__image', 1, { opacity: 0 }, { opacity: 1 });

        timeline.add(drawLine).add(showimage);

        var scene = new ScrollMagic.Scene({
            triggerElement: '#scene-2',
            offset: '-100px',
            duration: '50%'
        }).setTween(timeline)
        // .addIndicators()
        .addTo(scrollMagicController);
    };scene2();

    /* SCENE 3 ----------------------------------------------------------- */

    var scene3 = function scene3() {

        var drawLine = TweenMax.fromTo('.scene-3__rule', 1, { width: '0' }, { width: '100%' });

        var scene = new ScrollMagic.Scene({
            triggerElement: '#scene-3',
            duration: '50%',
            triggerHook: "onEnter"
        }).setTween(drawLine)
        // .addIndicators()
        .addTo(scrollMagicController);

        var scene2 = new ScrollMagic.Scene({
            triggerElement: '#scene-3',
            // offset: '100px',
            triggerHook: "onEnter",
            duration: "150%"
        }).setTween('#scene-3 img', { y: '-40%', ease: Linear.easeNone })
        // .addIndicators()
        .addTo(scrollMagicController);
    };scene3();

    /* SCENE 4 ----------------------------------------------------------- */

    var scene4 = function scene4() {};

    /* SCENE 5 ----------------------------------------------------------- */

    var scene5 = function scene5() {};

    /* SCENE 6 ----------------------------------------------------------- */

    var scene6 = function scene6() {};

    /* SCENE 7 ----------------------------------------------------------- */

    var scene7 = function scene7() {};

    /* SCENE 8 ----------------------------------------------------------- */

    var scene8 = function scene8() {};

    /* SCENE 9 ----------------------------------------------------------- */

    var scene9 = function scene9() {};
})();