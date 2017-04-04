/*
 * OS Helpers
 */ 

(() => {

    let OSHelpers = {

        getMediaSize: function( elem ) {
    		elem = ( elem ) ? elem : 'body';
    		return window.getComputedStyle( document.querySelector( elem ), '::before' ).getPropertyValue( 'content' ).replace(/"/g, "").replace(/'/g, "");
    	}

    }

    window.OSHelpers = OSHelpers;

})();