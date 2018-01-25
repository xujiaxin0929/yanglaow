$(function($){
    var city = remote_ip_info['city'];
        var citySpan = $('.city');
        citySpan.html(city);
        $('.nav_btn').on('click',function(){
            $('.nav').toggle();
            $('.nav_close').toggle();
            $('.nav_show').toggle();
        })
})