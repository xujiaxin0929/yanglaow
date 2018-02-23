$(document).ready(function () {


    function aboutUs() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/about/get-info',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('aboutUs_title', res);
                
                $('.aboutUs_watch_scroll').html(html);
                var content = template('aboutUs_content', res);
                
                $('.aboutUs_content_w').html(content);
                aboutTab();
                console.log(res)

            }
        })
    }

    function aboutTab() {
        $('.aboutUs_watch_scroll ul li:eq(0)').addClass('aboutUs_active');
        $('.aboutUs_content_txt:eq(0)').removeClass('hide').addClass('show');
        $('.aboutUs_watch_scroll ul li').on('click', function () {
            $(this).addClass('aboutUs_active').siblings('li').removeClass('aboutUs_active');
            var index = $(this).index();
            $('.aboutUs_content_txt:eq(' + index + ')').removeClass('hide').addClass('show').siblings('.aboutUs_content_txt').removeClass('show').addClass('hide');
        })
    }
    aboutUs();
    
})