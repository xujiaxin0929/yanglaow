$(function(){
    $(window).resize(infinite);
    function infinite() {
        var htmlWidth = $('html').width();
        if (htmlWidth >= 540) {
            $("html").css({
                "font-size" : "54px"
            });
        } else {
            $("html").css({
                "font-size" :  54 / 540 * htmlWidth + "px"
            });
        }
    }infinite();
});