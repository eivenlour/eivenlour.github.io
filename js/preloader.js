/* Preloader */

/* Disable scrolling */
function noScroll() {
    window.scrollTo(0, 0);
}

$(window).load(function() {
    $(window).on('scroll', noScroll);
    $(".preloader").delay(5000).fadeOut("slow");
    $(".overlayer").delay(5500).fadeOut("slow", function() {
        $(window).delay(5500).off('scroll', noScroll);
    });
});

  


