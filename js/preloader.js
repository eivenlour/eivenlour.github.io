/* Preloader */

$(window).on('load', function() {
    $(".main-content").css('visibility', 'hidden');
    $("body").css('overflow', 'hidden');  
    $(".preloader").delay(5000).fadeOut("slow", function () {
        $(".main-content").css('visibility', 'visible');
        $("body").css('overflow', 'auto');  
    });
    $(".overlayer").delay(5500).fadeOut("slow");
});

  


