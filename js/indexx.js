$(document).ready(function () {

   
    var cityArrNow;
    $("#city-picker").cityPicker({
        title: "选择省市区/县",
        onChange: function (picker, values, displayValues) {
            console.log(displayValues);
            var cityArr = displayValues;
            for (var i = 0; i < cityArr.length; i++) {
                cityArrNow = cityArr[1];
            }
            sessionStorage.setItem("localCity", cityArrNow);
            var seecityArr = sessionStorage.getItem('localCity');
            var haveCityspan = $('.city');
            haveCityspan.html(seecityArr);
            $('.hp_recommend_title>h4>i').html(seecityArr)
            cityAjax();
        }

    });
    $('.nav_btn').on('click',function(){
        $('.nav').toggle();
        $('.nav_close').toggle();
        $('.nav_show').toggle();
    })
    var haveCityspan = $('.city');
    var haveCity = sessionStorage.getItem('localCity');
    if(haveCity != null){
        haveCityspan.html(haveCity);
        $('.hp_recommend_title>h4>i').html(haveCity);
    }else{
        var city = remote_ip_info['city'];
        city = city + '市';
        sessionStorage.setItem("localCity", city);
        haveCityspan.html(city);
        $('.hp_recommend_title>h4>i').html(city);
    }
    
    function cityAjax() {
        var haveCityspan = $('.city');
        var postCity = haveCityspan.html();
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.city_name = postCity;
        //转字符串
        senddata = JSON.stringify(senddata);
        console.log(senddata)
        $.ajax({
            type: 'post',
            url: commonUrl + '/introduction/introduction-recommend',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('test', res);
                $('.hp_recommend_scroll').html(html);
                // console.log(res)
                var width = (4.26667 + 0.32) * (res.data.length);
                $('.hp_recommend_scroll ul').css({
                    'width': width + 'rem'
                })
            }
        })

        $.ajax({
            type: 'post',
            url: commonUrl + '/advertise/banner',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('banner', res);
                $('.swiper-wrapper').html(html);
                var swiper = new Swiper('.swiper-container',{
                    loop:'true'
                });
                console.log(res)
            }
        })

        $.ajax({
            type: 'post',
            url: commonUrl + '/introduction/recommend',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('recommend', res);
                $('.hp_brand_list').html(html);
                // console.log(res)
            }
        })
    }
    function living() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/popular-city/living',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('living', res);
                $('.hp_hotcity_box').html(html);
                // console.log(res)
            }
        })
    }

    function deep() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/deep-look',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('look_content', res);
                $('.hp_watch_w').append(html);
                var txt = template('look_title', res);
                $('.hp_watch_scroll').append(txt);
                console.log('-=-=-=-=-=-=')
                console.log(res)
                deeptab();
            }
        })
    }

    function industry() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/industry-content',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                var html = template('industry_title', res);

                $('.hp_dynamic_scroll').html(html);
                var txt = template('industry_content', res);
                $('.hp_dynamic_w').append(txt);
                clickOpin();
                console.log('---------------------------')
                console.log(res)
                dynamictab();
                
            }
        })
    }
    living();
    cityAjax();
    deep();
    industry();
    
    function deeptab() {
        $('.hp_watch_scroll ul li:eq(0)').addClass('active');

        $('.hp_watch_list_box:eq(0)').removeClass('hide').addClass('show');
        $('.hp_watch_scroll ul li').on('click', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            var index = $(this).index();
            $('.hp_watch_list_box:eq(' + index + ')').removeClass('hide').addClass('show').siblings('.hp_watch_list_box').removeClass('show').addClass('hide');
        })
    }
    function dynamictab() {
        $('.hp_dynamic_scroll ul li:eq(0)').addClass('dynamic_active');
        $('.hp_dynamic_list_box:eq(0)').removeClass('hide').addClass('show');
        $('.hp_dynamic_scroll ul li').on('click', function () {
            $(this).addClass('dynamic_active').siblings('li').removeClass('dynamic_active');
            var index = $(this).index();
            $('.hp_dynamic_list_box:eq(' + index + ')').removeClass('hide').addClass('show').siblings('.hp_dynamic_list_box').removeClass('show').addClass('hide');
        })
    }
    function clickOpin() {
        $('.fabulous').bind('click', function () {
            var fabNum = $(this).children('span').html();
            fabNumNew = +fabNum + 1;
            $(this).children('span').html(fabNumNew);
            var pageId = $(this).data('id');
            var downs = $(this).data('downs');
            addOpin(fabNumNew, pageId, downs);
            $(this).unbind('click');
        })
    }
    function addOpin(fabNumNew, pageId, downs) {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.id = pageId;
        senddata.opinion = "assist";
        console.log(senddata)
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/opinion',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                console.log(res)
            }
        })
    }
    template.defaults.imports.dateFormat = function (date, format) {

        if (typeof date === "string") {
            var mts = date.match(/(\/Date(\d+)\/)/);
            if (mts && mts.length >= 3) {
                date = parseInt(mts[2]);
            }
        }
        date = new Date(date);
        if (!date || date.toUTCString() == "Invalid Date") {
            return "";
        }

        var map = {
            "M": date.getMonth() + 1, //月份 
            "d": date.getDate(), //日 
            "h": date.getHours(), //小时 
            "m": date.getMinutes(), //分 
            "s": date.getSeconds(), //秒 
            "q": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };


        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    };

})

