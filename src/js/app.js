/*
 * App.js (in ES6, transpiled with Babel)
 */ 

(() => {
    
    const color = {
        red: '#e73d50',
        darkBlue: '#0a1e2c'
    };
    
    const scrollMagicController = new ScrollMagic.Controller();

    let headerScene = () => {

        let pulseTitle = TweenMax.fromTo( '.site-title', 1, { opacity: 0.3, transform: 'translateY(40vh)' }, { opacity: 1, transform: 'translateY(40vh)', yoyo: true, repeat: 2, onComplete: () => {
                TweenMax.fromTo( '.site-title', 1, { transform: 'translateY(40vh)' }, { transform: 'translateY(0)', ease: 'Quad.easeInOut' } );
            } } ), 
            slideInCopy = TweenMax.fromTo( '.scene-1__copy', 1, { transform: 'translateY(100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, delay: 3, ease: 'Quad.easeInOut', onComplete: () => {
                let app = document.getElementById('app');
                app.className = app.className.split('loading').join('') + 'initialized';
            } } )

    }; headerScene();

    /* SCENE 1 ----------------------------------------------------------- */

    let scene1 = () => {        

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

    }; scene1();

    /* SCENE 2 ----------------------------------------------------------- */

    let scene2 = () => {

        let timeline = new TimelineMax(),
            drawLine = TweenMax.fromTo( '.scene-2__rule', 1, { width: '0' }, { width: '100%' } ),
            showimage = TweenMax.fromTo( '.scene-2__image', 1, { opacity: 0 }, { opacity: 1 } );

        timeline
            .add(drawLine)
            .add(showimage);

        let scene = new ScrollMagic.Scene({
                triggerElement: '#scene-2',
                offset: '-100px',
                duration: '50%',
                // triggerHook: ""
            })
            .setTween(timeline)
            // .addIndicators()
            .addTo(scrollMagicController);
    
    }; scene2();

    /* SCENE 3 ----------------------------------------------------------- */

    let scene3 = () => {

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
                triggerHook: "onEnter", 
                duration: "150%"
            })
            .setTween('#scene-3 img', { y: '-40%', ease: Linear.easeNone })
            // .addIndicators()
            .addTo(scrollMagicController);
    
    }; scene3();

    /* SCENE 4 ----------------------------------------------------------- */

    let scene4 = () => {

    };

    /* SCENE 5 ----------------------------------------------------------- */

    let scene5 = () => {

    };

    /* SCENE 6 ----------------------------------------------------------- */

    let scene6 = () => {

    };

    /* SCENE 7 ----------------------------------------------------------- */

    let scene7 = () => {

    };

    /* SCENE 8 ----------------------------------------------------------- */

    let scene8 = () => {

    };

    /* SCENE 9 ----------------------------------------------------------- */

    let scene9 = () => {

    };

})();