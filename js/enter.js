$(document).ready(function () {

    function page() {

        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/zoujin',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                
                console.log(res)
                // var html = template('headmessage', res);

                // $('.pageDT_ajax').html(html);
            }
        })
    }
    page()
})