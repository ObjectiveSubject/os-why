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
                    revealList = TweenMax.staggerFromTo(listItems, 0.75, { opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)",
                    ease: Back.easeOut }, 0.1);

                var scene = new ScrollMagic.Scene({
                    triggerElement: list
                }).setTween(revealList).addTo(scrollMagicController);

                var duration = 930;

                if (list.className.indexOf('scene-7') > -1) {
                    duration = 830;
                    console.log(list.className);
                }

                var stickyList = new ScrollMagic.Scene({
                    triggerElement: list,
                    offset: -80,
                    duration: duration,
                    triggerHook: 'onLeave'
                }).setPin(list).addTo(scrollMagicController);
            });
        },

        drawLines: function drawLines() {

            var allScenes = document.querySelectorAll('.scene');

            allScenes.forEach(function (sceneObj) {

                var rule = sceneObj.querySelector('.scene-rule');
                var drawRule = TweenMax.fromTo(rule, 1, { width: '0' }, { width: '100%', ease: Linear.easeNone });
                var sceneOptions = {
                    triggerElement: sceneObj,
                    duration: '50%',
                    triggerHook: "onEnter"
                };

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

            var showButton = TweenMax.fromTo('.scene-1__button', 0.5, { opacity: 0 }, { opacity: 1 });

            var scene2 = new ScrollMagic.Scene({
                triggerElement: '.scene-1__button'
            }).setTween(showButton).addTo(scrollMagicController);
        },

        /* SCENE 2 ----------------------------------------------------------- */

        scene2: function scene2() {

            var showimage = TweenMax.fromTo('.scene-2__image', 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone });

            var scene = new ScrollMagic.Scene({
                triggerElement: '#scene-2',
                duration: '50%',
                triggerHook: "onLeave"
            }).setTween(showimage).addTo(scrollMagicController);

            var scene2 = new ScrollMagic.Scene({
                triggerElement: '#scene-2',
                duration: '200%',
                triggerHook: "onLeave"
            }).setPin('.scene-2__background').addTo(scrollMagicController);
        },

        /* SCENE 3 ----------------------------------------------------------- */

        scene3: function scene3() {

            var scene2 = new ScrollMagic.Scene({
                triggerElement: '#scene-3',
                // offset: '100px',
                // triggerHook: "onEnter", 
                duration: "200%"
            }).setTween('#scene-3 img', { y: '-50%', ease: Linear.easeNone }).addTo(scrollMagicController);
        },

        /* SCENE 4 ----------------------------------------------------------- */

        scene4: function scene4() {

            var expandImage = TweenMax.fromTo('.scene-4__image', 1, { transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1, ease: Linear.easeNone }),
                scene = new ScrollMagic.Scene({
                triggerElement: '#scene-4',
                duration: window.outerHeight / 2
            }).setTween(expandImage).addTo(scrollMagicController);
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

            var manGoesRight = TweenMax.fromTo('.scene-6__image.man', 1, { left: '40%' }, { left: '60%', ease: Linear.easeNone });
            var womanGoesLeft = TweenMax.fromTo('.scene-6__image.woman', 1, { right: '40%' }, { right: '60%', ease: Linear.easeNone });

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

        scene7: function scene7() {},

        /* SCENE 8 ----------------------------------------------------------- */

        scene8: function scene8() {},

        /* SCENE 9 ----------------------------------------------------------- */

        scene9: function scene9() {}

    }; // scenes

    // loop through each key in {scenes}
    Object.keys(scenes).forEach(function (fn) {
        // check to see if it's a function
        if (typeof scenes[fn] === "function") scenes[fn]();
    });
})();