$(document).ready(function () {


    function dynamicHead() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/instudry-header',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                 res.comurl = comurl;
                // var html = template('aboutUs_title', res);

                // $('.aboutUs_watch_scroll').html(html);
                // var content = template('aboutUs_content', res);

                // $('.aboutUs_content_w').html(content);
                console.log('----------------------------')
                console.log(res)

            }
        })
    }
    function dynamicTab() {
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
                var html = template('dynamic_title', res);

                $('.dynamic_content_box').html(html);
                // var has = $('.dynamic_news_w div').hasClass('dynamic_news_list');
                console.log('-!!!!!!!!!!!!!!!!!!!!!!!!!!')
                console.log(res)
                $('.dynamic_news_w').each(function(i){
                    console.log($(this).children().hasClass('dynamic_news_list'))
                    var has = $(this).children().hasClass('dynamic_news_list');
                    if(has == false){
                        $('.dynamic_news:eq('+i+') .dynamic_news_w .loading span').html('暂无数据');
                    }
                })
                clickOpin();
                $('.loading').on('click', function () {

                    var dataCat = $(this).data('catid');
                    var cliNum = $(this).data('num');
                    cliNum = cliNum + 1;
                    $(this).data('num', cliNum);
                    console.log(cliNum);
                    var that = $(this)
                    dynamicCli(dataCat, cliNum, that)
                })
                console.log('!!!!!!!!!!!!!!!!!!')
                console.log(res)

            }
        })
    }
    function dynamicCli(dataCat, cliNum, that) {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.category_id = dataCat;
        senddata.page = cliNum;
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/article-page',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                 res.comurl = comurl;
                var addhtml = template('dynamic_addtitle', res.data);
                $(that).before(addhtml);
                if (res.data.status) {
                    that.hide()
                } else {
                    that.show()
                }
                // if (dataCat == $('.loading').data('catid')) {
                //     if (that.res.data.status) {
                //         that.hide()
                //     } else {
                //         that.show()
                //     }
                // }
                clickOpin();
                console.log('------------------------')
                console.log(res.data)
            }
        })
    }
    function clickOpin() {
        $('.fabulous').bind('click', function () {
            var fabNum = $(this).children('span').html();
            fabNumNew = +fabNum  + 1;
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

    function allLook() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/every-see',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                 res.comurl = comurl;
                console.log(res)
                var html = template('allLook', res);

                $('.look_list').html(html);
            }
        })
    }
    dynamicTab();
    dynamicHead();
    allLook();

})