/* Preloader */

/* Disable scrolling */
function noScroll() {
    window.scrollTo(0, 0);
}

$(window).on('load', function() {
    $(".preloader").delay(5000).fadeOut(2000, function () {
        $(".main-content").css('visibility', 'visible');
        $("body").css('overflow', 'auto');  
    });
});

  


