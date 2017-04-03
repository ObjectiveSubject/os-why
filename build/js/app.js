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
                    ease: Quad.easeOut }, 0.1);

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

            var slideCurtain = TweenMax.fromTo('.scene-2__image.curtain', 1, { y: '180px' }, { y: 0, ease: Linear.easeNone }),
                timeline = new TimelineMax(),
                showExplorer = TweenMax.fromTo('.scene-2__image.man', 0.5, { x: '100px', opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut }),
                showLight = TweenMax.fromTo('.scene-2__image.light', 0.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut });

            timeline.add(showExplorer).add(showLight);

            var curtain = new ScrollMagic.Scene({
                triggerElement: '.scene-2__images',
                duration: window.innerHeight * 0.35,
                triggerHook: "onEnter"
            }).setTween(slideCurtain).addIndicators({ name: 'curtain' }).addTo(scrollMagicController);

            var explorer = new ScrollMagic.Scene({
                triggerElement: '.scene-2__images',
                offset: window.innerHeight * 0.35,
                triggerHook: "onEnter"
            }).setTween(timeline).addIndicators({ name: 'explorer' }).addTo(scrollMagicController);

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

            var manGoesRight = TweenMax.fromTo('.scene-6__image.man', 1, { left: '40%' }, { left: '70%', ease: Linear.easeNone });
            var womanGoesLeft = TweenMax.fromTo('.scene-6__image.woman', 1, { right: '40%' }, { right: '70%', ease: Linear.easeNone });

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