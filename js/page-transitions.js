/* 
    Code modified from pagetransitions.js obtained from:
    Codrops Page Transitions by Pedro Botelho: https://github.com/codrops/PageTransitions 
*/

var PageTransitions = (function() {

    /* Declare variables */
    var $pages = $ ( '.pt-page' ),
        $start = $ ( '.start-button'),
        $next = $ ( '.next-button'),
        $back = $ ( '.back-button'),
        
        pagesCount = $pages.length,
        current = 0,

        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        endBackPage = false,

        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        support = Modernizr.cssanimations

    /* Initialization */
    function init() {

        $pages.each( function() {
            var $page = $( this );
            $page.data( 'originalClassList', $page.attr( 'class' ) );
        } );

        /* Set first page as current page */
        $pages.eq( current ).addClass( 'pt-page-current' );

        /* When START button is clicked, go to next page */
        $start.on( 'click', function() {
            nextPage();
        } );
        
        /* When next button is clicked, go to next page */
        $next.on( 'click', function() {
            nextPage();
        } );

        /* When back button is clicked, go to previous page */
        $back.on( 'click', function() {
            backPage();
        } );
    }

    /* Go to next page */
    function nextPage() {

        if( isAnimating ) {
            return false;
        }
        isAnimating = true;

        var $currPage = $pages.eq( current );

        if( current < pagesCount - 1 ) {
            ++current;
        }
        else {
            current = 0;
        }

        var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
            outClass = 'pt-page-moveToLeft', inClass = 'pt-page-moveFromRight';

        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage);
            }
        } );

        $nextPage.addClass( inClass ).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage);
            }
        } );

        if( !support ) {
            onEndAnimation( $currPage, $nextPage);
        }

    }

    /* Go to previous page */
    function backPage() {

        if( isAnimating ) {
            return false;
        }
        isAnimating = true;

        var $currPage = $pages.eq( current );

        if( current > 1 ) {
            --current;
        }
        else {
            current = 0;
        }

        var $backPage = $pages.eq( current ).addClass( 'pt-page-current' ),
            outClass = 'pt-page-moveToRight', inClass = 'pt-page-moveFromLeft';

        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endBackPage ) {
                onEndAnimation( $currPage, $backPage);
            }
        } );

        $backPage.addClass( inClass ).on( animEndEventName, function() {
            $backPage.off( animEndEventName );
            endBackPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $backPage);
            }
        } );

        if( !support ) {
            onEndAnimation( $currPage, $backPage);
        }

    }

    /* When animation ends, reset */
    function onEndAnimation( $outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        endBackPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    }

    /* Reset */
    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
    }

    init();

    return {
        init : init,
        nextPage : nextPage,
        backPage : backPage
    };

})();
