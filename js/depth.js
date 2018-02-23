$(document).ready(function () {
    function depthSwiper() {
        //加密
        var senddata = {};
        var cityName = sessionStorage.getItem("localCity");
        senddata.signature = "EB6EB8B669BA4846";
        senddata.city_name = cityName;
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/advertise/face-banner',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                // console.log(res)
                var html = template('swiper', res);
                $('.gallery-top').html(html);
                var bottomhtml = template('swiperbottom', res);
                $('.gallery-thumbs').html(bottomhtml);
                var galleryTop = new Swiper('.gallery-top', {
                    spaceBetween: 5,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                });
                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 5,
                    slidesPerView: 5,
                    touchRatio: 0.2,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                    slideToClickedSlide: true,
                });
                galleryTop.controller.control = galleryThumbs;
                galleryThumbs.controller.control = galleryTop;

                $('.gallery-thumbs .swiper-slide').css({
                    'width': '',
                    "margin-right": ''
                });
            }
        })
    }
    function rank() {
        //加密
        var senddata = {};
        var cityName = sessionStorage.getItem("localCity");
        senddata.signature = "EB6EB8B669BA4846";
        senddata.city_name = cityName;
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/recommend-list',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                // console.log(res)
                var html = template('rank', res);
                $('.depth_rank_w').html(html);
            }
        })
    }

    function recommend() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/recommend',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                console.log('************************************')
                console.log(res)
                var html = template('recommend', res);
                $('.depth_recommend_w').html(html);
            }
        })
    }

    function depth() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/depth',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                console.log(res)
                var html = template('deptbox', res);
                $('.depth_enter_box').html(html);
            }
        })
    }


    depthSwiper();
    rank();
    recommend();
    depth();
})




