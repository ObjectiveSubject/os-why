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

        headerScene: () => {

            let pulseTitle = TweenMax.fromTo( '.site-title', 1, { opacity: 0.3, transform: 'translateY(40vh)' }, { opacity: 1, transform: 'translateY(40vh)', yoyo: true, repeat: 2, onComplete: () => {
                    TweenMax.fromTo( '.site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' } );
                } } ), 
                slideInCopy = TweenMax.fromTo( '.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 3, ease: 'Quad.easeInOut', onComplete: () => {
                    let app = document.getElementById('app');
                    app.className = app.className.split('loading').join('') + 'initialized';
                } } )

        },

        /* SCENE 1 ----------------------------------------------------------- */

        scene1: () => {        

            let timeline = new TimelineMax(),
                drawLine = TweenMax.fromTo( '.scene-1__rule', 1, { width: '0' }, { width: '100%' } ),
                showButton = TweenMax.fromTo( '.scene-1__button', 1, { opacity: 0 }, { opacity: 1 } );

            timeline
                .add(drawLine)
                .add(showButton);

            // Create the Scene and trigger when visible with ScrollMagic
            let scene = new ScrollMagic.Scene({
                    triggerElement: '#scene-1',
                    offset: (window.outerHeight / 2),
                    duration: '50%',
                    // triggerHook: "onLeave"
                })
                .setTween(timeline)
                // .addIndicators()
                .addTo(scrollMagicController);

        },

        /* SCENE 2 ----------------------------------------------------------- */

        scene2: () => {

            let timeline = new TimelineMax(),
                drawLine = TweenMax.fromTo( '.scene-2__rule', 1, { width: '0' }, { width: '100%' } ),
                showimage = TweenMax.fromTo( '.scene-2__image', 1, { opacity: 0 }, { opacity: 1 } );

            timeline
                .add(drawLine)
                .add(showimage);

            let scene = new ScrollMagic.Scene({
                    triggerElement: '#scene-2',
                    // offset: '-100px',
                    duration: '50%',
                    triggerHook: "onLeave"
                })
                .setTween(timeline)
                // .addIndicators({name:'graphics'})
                .addTo(scrollMagicController);

             let scene2 = new ScrollMagic.Scene({
                    triggerElement: '#scene-2',
                    // offset: '-100px',
                    duration: '200%',
                    triggerHook: "onLeave"
                })
                .setPin('.scene-2__background')
                // .addIndicators({name:'background'})
                .addTo(scrollMagicController);
        
        },

        /* SCENE 3 ----------------------------------------------------------- */

        scene3: () => {

            let drawLine = TweenMax.fromTo( '.scene-3__rule', 1, { width: '0' }, { width: '100%' } )

            let scene = new ScrollMagic.Scene({
                    triggerElement: '#scene-3',
                    duration: '50%',
                    triggerHook: "onEnter"
                })
                .setTween(drawLine)
                // .addIndicators()
                .addTo(scrollMagicController);

            let scene2 = new ScrollMagic.Scene({
                    triggerElement: '#scene-3',
                    // offset: '100px',
                    // triggerHook: "onEnter", 
                    duration: "200%"
                })
                .setTween('#scene-3 img', { y: '-50%', ease: Linear.easeNone })
                // .addIndicators()
                .addTo(scrollMagicController);

            let revealList = TweenMax.staggerFromTo(".scene-3__list li.reveal", 0.75, { opacity: 0, transform: "translateY(50px)"}, { opacity: 1, transform: "translateY(0)", ease: Back.easeOut}, 0.1);

            let scene3 = new ScrollMagic.Scene({
                    triggerElement: '#scene-3',
                })
                .setTween(revealList)
                // .addIndicators()
                .addTo(scrollMagicController);
        
        },

        /* SCENE 4 ----------------------------------------------------------- */

        scene4: () => {

            let expandImage = TweenMax.fromTo( '.scene-4__image', 1, { transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 } )

            let scene = new ScrollMagic.Scene({
                    triggerElement: '#scene-4',
                    duration: (window.outerHeight / 2),
                    // triggerHook: "onEnter"
                })
                .setTween(expandImage)
                // .addIndicators()
                .addTo(scrollMagicController);

        },

        /* SCENE 5 ----------------------------------------------------------- */

        scene5: () => {

        },

        /* SCENE 6 ----------------------------------------------------------- */

        scene6: () => {

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