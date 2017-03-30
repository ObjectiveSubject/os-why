/*
 * App.js (in ES6, transpiled with Babel)
 */ 

(() => {
    
    const color = {
        red: '#e73d50',
        darkBlue: '#0a1e2c'
    };
    
    const scrollMagicController = new ScrollMagic.Controller();

    const scenes = {

        /* SCENE LISTS ----------------------------------------------------- */

        sceneLists: () => {

            let sceneLists = document.querySelectorAll('.scene-list');

            sceneLists.forEach( (list) => {

                let listItems = list.querySelectorAll('.reveal'),
                    revealList = TweenMax.staggerFromTo( listItems, 
                                    0.75, 
                                    { opacity: 0, transform: "translateY(50px)"}, 
                                    { opacity: 1, transform: "translateY(0)", 
                                    ease: Quad.easeOut}, 
                                    0.1
                                 );

                let scene = new ScrollMagic.Scene({
                        triggerElement: list,
                    })
                    .setTween(revealList)
                    .addTo(scrollMagicController);

                let duration = 930;

                if ( list.className.indexOf('scene-7') > -1 ) {
                    duration = 830;
                    console.log(list.className);                    
                }
                
                let stickyList = new ScrollMagic.Scene({
                    triggerElement: list,
                    offset: -150,
                    duration: duration,
                    triggerHook: 'onLeave'
                })
                .setPin(list)
                .addTo(scrollMagicController);
                    
            } );

        },

        drawLines: () => {

            let allScenes = document.querySelectorAll('.scene'); 

            allScenes.forEach( (sceneObj) => {

                let rule = sceneObj.querySelector('.scene-rule');
                let drawRule = TweenMax.fromTo( rule, 1, { width: '0' }, { width: '100%', ease: Linear.easeNone } );
                let sceneOptions = {
                        triggerElement: sceneObj,
                        duration: '50%',
                        triggerHook: "onEnter"
                    };

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

            } );

        },

        /* HEADER SCENE ----------------------------------------------------- */

        headerScene: () => {

            let pulseTitle = TweenMax.fromTo( '.site-header .site-title', 1, { opacity: 0.3, transform: 'translateY(40vh)' }, { opacity: 1, transform: 'translateY(40vh)', yoyo: true, repeat: 2, onComplete: () => {
                    TweenMax.fromTo( '.site-header .site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' } );
                } } ), 
                slideInCopy = TweenMax.fromTo( '.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 3, ease: 'Quad.easeInOut', onComplete: () => {
                    let app = document.getElementById('app');
                    app.className = app.className.split('loading').join('') + 'initialized';
                } } )

        },

        /* SCENE 1 ----------------------------------------------------------- */

        scene1: () => {        

            let showButton = TweenMax.fromTo( '.scene-1__button', 0.5, { opacity: 0 }, { opacity: 1 } );
            
            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '.scene-1__button',
                })
                .setTween(showButton)
                .addTo(scrollMagicController);

        },

        /* SCENE 2 ----------------------------------------------------------- */

        scene2: () => {

            let showimage = TweenMax.fromTo( '.scene-2__image', 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone } );

            let scene = new ScrollMagic.Scene({
                    triggerElement: '#scene-2',
                    duration: '50%',
                    triggerHook: "onLeave"
                })
                .setTween(showimage)
                .addTo(scrollMagicController);

             let scene2 = new ScrollMagic.Scene({
                    triggerElement: '#scene-2',
                    duration: '200%',
                    triggerHook: "onLeave"
                })
                .setPin('.scene-2__background')
                .addTo(scrollMagicController);

        },

        /* SCENE 3 ----------------------------------------------------------- */

        scene3: () => {

            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '#scene-3',
                    // offset: '100px',
                    // triggerHook: "onEnter", 
                    duration: "200%"
                })
                .setTween('#scene-3 img', { y: '-50%', ease: Linear.easeNone })
                .addTo(scrollMagicController);
        
        },

        /* SCENE 4 ----------------------------------------------------------- */

        scene4: () => {

            let expandImage = TweenMax.fromTo( '.scene-4__image', 1, { transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1, ease: Linear.easeNone } ),
                scene = new ScrollMagic.Scene({
                        triggerElement: '#scene-4',
                        duration: (window.outerHeight / 2),
                    })
                    .setTween(expandImage)
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

            let manGoesRight = TweenMax.fromTo( '.scene-6__image.man', 1, { left: '40%' }, { left: '60%', ease: Linear.easeNone } );
            let womanGoesLeft = TweenMax.fromTo( '.scene-6__image.woman', 1, { right: '40%' }, { right: '60%', ease: Linear.easeNone } );

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

        },

        /* SCENE 8 ----------------------------------------------------------- */

        scene8: () => {

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

})();