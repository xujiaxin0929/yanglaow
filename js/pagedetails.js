$(document).ready(function () {

    function page() {
        var urlId = GetQueryString("id")
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.id = urlId;
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/detail',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                
                // console.log(res)
                
                var resDate = res.data.create_time;
                var newDate = new Date();
                newDate.setTime(resDate * 1000);
                console.log(typeof(resDate))
                var dattt = newDate.toLocaleDateString()
                var str = dattt.replace(/\//g,"-");
                console.log(str)
                res.data.create_time = str
                // var dattt = getDate(resDate)
                // console.log(dattt)
                var html = template('headmessage', res);

                $('.pageDT_ajax').html(html);
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
                 console.log('!!!!!!!!!')
                // console.log(res)
                var html = template('allLook', res);

                $('.look_list').html(html);
            }
        })
    }

    function jctj() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/rec-list',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                 res.comurl = comurl;
                //  console.log('!!!!!!!!!')
                //  console.log(res)
                var html = template('marvel', res);

                $('.pageDT_marvellous_w').append(html);
            }
        })
    }

    function rank() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
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
                console.log(res)
                var html = template('rank', res);
                $('.pageDT_relevant_w ul').html(html);
            }
        })
    }

    page();
    allLook();
    jctj();
    rank();


    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    /*
    function getDate(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("年");
        var c = a[0].split("年");
        var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
        return date;
    }*/
    
    //测试 
    // alert(getDate("2012-9-20 19:46:18")); 


})