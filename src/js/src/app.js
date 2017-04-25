/*
 * App.js (in ES6, transpiled with Babel)
 */ 

(() => {

    let body = document.querySelector('body'),
        bodyClass = body.className;
    
    const h = OSHelpers;
    // abort if viewport isn't wide enough or certain features aren't supported
    if ( h.getMediaSize() !== "large" || ! document.querySelector('body').dataset ) {
        body.className = bodyClass.split("loading").join(" initialized ");
        return;
    }

    const color = {
        red: '#e73d50',
        darkBlue: '#0a1e2c'
    };
    const scrollMagicController = new ScrollMagic.Controller();
    const scenes = {

        /* SCENE LISTS ----------------------------------------------------- */

        sceneLists: () => {

            let sceneLists = document.querySelectorAll('.scene-list');

            for ( var i=0; sceneLists.length > i; i++ ) {

                let list = sceneLists[i],
                    listItems = list.querySelectorAll('.reveal'),
                    scene = document.querySelector( '.' + list.className.split('__list')[0] ),
                    revealList = TweenMax.staggerFromTo( listItems, 
                                    0.5, 
                                    { opacity: 0, transform: "translateY(50px)"}, 
                                    { opacity: 1, transform: "translateY(0)", 
                                    ease: Power2.easeOut}, 
                                    0.1
                                 );

                let duration = 870;
                if ( list.dataset && list.dataset.duration ) {
                    duration = parseInt(list.dataset.duration);
                } 

                let sceneList = new ScrollMagic.Scene({
                        triggerElement: list,
                        offset: duration + 40
                    })
                    .setTween(revealList)
                    .addTo(scrollMagicController);
                
                let stickyList = new ScrollMagic.Scene({
                        triggerElement: list,
                        offset: 40,
                        duration: duration,
                    })
                    .setPin(list)
                    .addTo(scrollMagicController);
                    
            }

        },

        drawLines: () => {

            let allScenes = document.querySelectorAll('.scene'); 

            for ( var i=0; allScenes.length > i; i++ ) {

                let sceneObj = allScenes[i],
                    rule = sceneObj.querySelector('.scene-rule');

                if ( rule.className.indexOf( 'no-draw' ) > -1 ) 
                    continue;

                let drawRule = TweenMax.fromTo( rule, 1, { width: '0' }, { width: '100%', ease: Linear.easeNone } ),
                    sceneOptions = {
                        triggerElement: sceneObj,
                        duration: '50%',
                        triggerHook: "onEnter"
                    },
                    customOptions = ( rule.dataset && rule.dataset.options ) ? JSON.parse( rule.dataset.options ) : {};
                
                Object.assign( sceneOptions, customOptions );

                if ( sceneObj.className.indexOf('scene-1') > -1 ) {
                    sceneOptions.offset = ( window.outerHeight / 2 );
                    sceneOptions.triggerHook = "onCenter";
                }
                if ( sceneObj.className.indexOf('scene-2') > -1 ) {
                    sceneOptions.triggerHook = "onLeave";
                }

                let scene = new ScrollMagic.Scene( sceneOptions )
                    .setTween(drawRule)
                    .addTo(scrollMagicController);

            };

        },

        /* HEADER SCENE ----------------------------------------------------- */

        headerScene: () => {

            let pulseTitle = TweenMax.fromTo( '.site-header .site-title', 1, { opacity: '0', transform: 'translateY(40vh)' }, { opacity: '1', transform: 'translateY(40vh)', delay: 1, ease: 'Quad.easeInOut', onComplete: () => {
                    TweenMax.fromTo( '.site-header .site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' } )
                } } ), 
                slideInCopy = TweenMax.fromTo( '.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 2, ease: 'Quad.easeInOut' } );

        },

        /* SCENE 1 ----------------------------------------------------------- */

        scene1: () => {        

            let button = document.querySelector('.scene-1__button'),
                showButton = TweenMax.fromTo( button, 0.5, { opacity: 0 }, { opacity: 1, onComplete: () => {
                    button.className += ' anim-pulse';
                } } );
            
            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '.scene-1__button',
                    offset: '-24px'
                })
                .setTween(showButton)
                .addTo(scrollMagicController);

        },

        /* SCENE 2 ----------------------------------------------------------- */

        scene2: () => {

            let directoryListItems = TweenMax.staggerFromTo( '.scene-directory li', 
                    0.5, 
                    { opacity: 0, transform: "translateY(50px)"}, 
                    { opacity: 1, transform: "translateY(0)", 
                    ease: Power2.easeOut}, 
                    0.1
                ),
                slideCurtain = TweenMax.fromTo( '.scene-2__image.curtain', 1, { y: '180px' }, { y: 0, ease: Linear.easeNone } ),
                timeline = new TimelineMax(),
                showExplorer = TweenMax.fromTo( '.scene-2__image.man', 0.5, { x: '100px', opacity: 0 }, { x: 0, opacity: 1, ease: Power2.easeOut } ),
                showLight = TweenMax.fromTo( '.scene-2__image.light', 0.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut } );

            timeline
                .add(showExplorer)
                .add(showLight);

            let showDirectory = new ScrollMagic.Scene({
                    triggerElement: '#overview',
                    triggerHook: "onLeave"
                })
                .setTween(directoryListItems)
                .addTo(scrollMagicController);

            let curtain = new ScrollMagic.Scene({
                    triggerElement: '.scene-2__images',
                    duration: window.innerHeight * 0.35,
                    triggerHook: "onEnter"
                })
                .setTween(slideCurtain)
                .addTo(scrollMagicController);

            let explorer = new ScrollMagic.Scene({
                    triggerElement: '.scene-2__images',
                    offset: window.innerHeight * 0.35,
                    triggerHook: "onEnter"
                })
                .setTween(timeline)
                .addTo(scrollMagicController);

             let stickyBg = new ScrollMagic.Scene({
                    triggerElement: '#overview',
                    offset: 200,
                    duration: window.innerHeight + 200,
                    triggerHook: "onEnter"
                })
                .setPin('.scene-2__background', {pushFollowers: false})
                .addTo(scrollMagicController);

        },

        /* SCENE 3 ----------------------------------------------------------- */

        scene3: () => {

            let scene = new ScrollMagic.Scene({
                    triggerElement: '.scene-3__images',
                    duration: 900
                })
                .setTween('.scene-3__image.man', { y: '20%', ease: Linear.easeNone })
                .addTo(scrollMagicController);

            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '.scene-3__images',
                    duration: 900
                })
                .setTween('.scene-3__image.lines', { y: '-10%', ease: Linear.easeNone })
                .addTo(scrollMagicController);
        
        },

        /* SCENE 4 ----------------------------------------------------------- */

        scene4: () => {

            let expandImage = TweenMax.fromTo( '.scene-4__image.small-man', 1, { transform: 'scale(0.5)' }, { transform: 'scale(1)', transformOrigin: '480px 680px', ease: Linear.easeNone } ),
                shrinkImage = TweenMax.fromTo( '.scene-4__image.big-man', 1, { transform: 'scale(1)' }, { transform: 'scale(0.5)', transformOrigin: '80px 785px', ease: Linear.easeNone } );
                
            let scene = new ScrollMagic.Scene({
                    triggerElement: '.scene-4__images',
                    offset: 150,
                    duration: (window.outerHeight / 2),
                })
                .setTween(expandImage)
                .addTo(scrollMagicController);

            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '.scene-4__images',
                    offset: 150,
                    duration: (window.outerHeight / 2),
                })
                .setTween(shrinkImage)
                .addTo(scrollMagicController);
                

        },

        /* SCENE 5 ----------------------------------------------------------- */

        scene5: () => {

            let rotateLight = TweenMax.fromTo( '.scene-5__image.light', 1, { rotation: 30 }, { rotation: 0, transformOrigin: '523px 83px', ease: Linear.easeNone } ),
                scene2 = new ScrollMagic.Scene({
                        triggerElement: '.scene-5__images',
                        duration: window.innerHeight + 900,
                        triggerHook: "onEnter"
                    })
                    .setTween(rotateLight)
                    .addTo(scrollMagicController);

            let revealImage = TweenMax.fromTo( '.scene-5__image.man', 1, { transform: 'translateX(150px)' }, { transform: 'translateX(0)', ease: Linear.easeNone } ),
                scene3 = new ScrollMagic.Scene({
                        triggerElement: '.scene-5__images',
                        duration: window.innerHeight + 900,
                        triggerHook: "onEnter"
                    })
                    .setTween(revealImage)
                    .addTo(scrollMagicController);

        },

        /* SCENE 6 ----------------------------------------------------------- */

        scene6: () => {

            let manGoesRight = TweenMax.fromTo( '.scene-6__image.man', 1, { left: '30%' }, { left: '60%', ease: Linear.easeNone } );
            let womanGoesLeft = TweenMax.fromTo( '.scene-6__image.woman', 1, { right: '30%' }, { right: '60%', ease: Linear.easeNone } );

            let manScene = new ScrollMagic.Scene({
                    triggerElement: '.scene-6__images',
                    duration: window.innerHeight + 570,
                    offset: window.innerHeight * -0.5
                })
                .setTween( manGoesRight )
                .addTo(scrollMagicController);

            let womanScene = new ScrollMagic.Scene({
                    triggerElement: '.scene-6__images',
                    duration: window.innerHeight + 508,
                    offset: window.innerHeight * -0.5
                })
                .setTween( womanGoesLeft )
                .addTo(scrollMagicController);

        },

        /* SCENE 7 ----------------------------------------------------------- */

        scene7: () => {

            let tween = TweenMax.fromTo( '.scene-7__image.mark', 1, { y: '10%', opacity: '0' }, { y: '0%', opacity: '1', ease: Linear.easeNone } ),
                scene = new ScrollMagic.Scene({
                    triggerElement: '.scene-7__images',
                    duration: 450
                })
                .setTween( tween )
                .addTo(scrollMagicController);

        },

        /* SCENE 8 ----------------------------------------------------------- */

        scene8: () => {

            let timeline = new TimelineMax(),
                clipper  = TweenMax.fromTo( '.scene-image.clipper', 0.15, { y: '50px', opacity: '0' }, { y: '0', opacity: '1', ease: Quad.easeOut } ),
                hose     = TweenMax.fromTo( '.scene-image.hose', 0.15, { x: '-50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut } ),
                ladder   = TweenMax.fromTo( '.scene-image.ladder', 0.15, { x: '50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut } ),
                trimmer  = TweenMax.fromTo( '.scene-image.trimmer', 0.15, { x: '-50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut } ),
                waterer  = TweenMax.fromTo( '.scene-image.waterer', 0.15, { x: '50px', opacity: '0' }, { x: '0', opacity: '1', ease: Quad.easeOut } );

            timeline
                .add(clipper)
                .add(hose)
                .add(ladder)
                .add(trimmer)
                .add(waterer);

            let scene = new ScrollMagic.Scene({
                    triggerElement: '.scene-8__images',
                    triggerHook: 'onLeave'
                })
                .setTween( timeline )
                .addTo(scrollMagicController);

        },

        /* SCENE 9 ----------------------------------------------------------- */

        scene9: () => {
        },

    } // scenes

    // loop through each key in {scenes}
    Object.keys(scenes).forEach( (fn) => {
        // check to see if it's a function
        if ( typeof scenes[fn] === "function" ) scenes[fn]();
    } );

    const events = {
        init: () => {

            let smoothScrollLinks = document.querySelectorAll('.js-smooth-scroll');

            for ( var i=0; smoothScrollLinks.length > i; i++ ) {
                let link = smoothScrollLinks[i];
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    let elId = e.target.dataset.href;
                    document.querySelector(elId).scrollIntoView({ behavior: 'smooth' });
                });
            }

            let delayedFields = document.querySelectorAll('.js-delayed-field'),
                triggerFields = document.querySelectorAll('.js-trigger-field'),
                delayedFieldsVisible = false;

            console.log(delayedFields);

            for ( var i=0; triggerFields.length > i; i++ ) {
                let field = triggerFields[i];
                field.addEventListener('focus', (e) => {
                    console.log(e);
                    if ( ! delayedFieldsVisible ) {
                        for ( var d=0; delayedFields.length > d; d++ ) {
                            delayedFields[d].className = delayedFields[d].className += ' visible';
                        }
                    }
                    delayedFieldsVisible = true;
                });
            }

        }  
    };

    events.init();
    
    body.className = bodyClass.split('loading static-app').join(' initialized ');


})();