$(document).ready(function(){

    var datanum,addnum;
    function listimg() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/face',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                console.log(res)
                
                var html = template('list', res);
                $('.faceEach_list').append(html);

            }
        })
    }
    function clickList(){
        $('.loading').on('click',function(){
            datanum = $(this).attr('data-num');
            // console.log(datanum)
            addnum = datanum*1 + 1;
            $('.loading').attr('data-num',addnum)
            // console.log(addnum)

              //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.page = addnum;
        senddata.pagesize = 4;
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/face',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                console.log(res)
                var html = template('list', res);
                $('.faceEach_list').append(html);

            }
        })
        })
       
    }
    listimg()
    clickList()
})

