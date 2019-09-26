/* Preloader */

/* Disable scrolling */
function noScroll() {
    window.scrollTo(0, 0);
}

$(document).ready(function() {
    $(window).on('scroll', noScroll);
    $("body").css('overflow', 'hidden');   
    $(".preloader").delay(5000).fadeOut("slow", function () {
        $(window).off('scroll', noScroll);
        $("body").css('overflow', 'auto');  
    });
});

  


