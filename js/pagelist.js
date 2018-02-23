$(document).ready(function(){
    var liallwidth,fatherindex,sonid,pagenum,addpagenum;
    var str;
    var tianjia;
    var marginnum = 0.4;
    var liwidth = 1.3;
    function head() {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/article-category',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                 res.comurl = comurl;
                console.log(res)
                var html = template('head', res);
                $('.pageList_tab_scroll .pageList_tab_father').html(html);
                var sonhtml = template('son',res);
                $('.pageList_tab_son_box').html(sonhtml);
                $('.pageList_tab_father li:eq(0)').addClass('pageList_tab_active');
                $('.pageList_tab_son_box ul:eq(0)').removeClass('hide').children().eq(0).addClass('pageList_tab_active');
                // liwidth = $('.pageList_tab_son_box ul:eq(0) li').width();
                liallwidth = liwidth * $('.pageList_tab_son_box ul:eq(0) li').length + 1.01333* $('.pageList_tab_son_box ul:eq(0) li').length;
                // console.log(liallwidth)
                $('.pageList_tab_son_box ul:eq(0)').css('width',liallwidth+'rem');
                $('.pageList_tab_father li').on('click',function(){
                    fatherindex = $(this).index();
                    $('.pageList_tab_son:eq('+fatherindex+') li:eq(0)').addClass('pageList_tab_active').siblings().removeClass('pageList_tab_active');
                    $(this).addClass('pageList_tab_active').siblings().removeClass('pageList_tab_active');
                    $('.pageList_tab_son_box ul:eq('+fatherindex+')').removeClass('hide').siblings('.pageList_tab_son').addClass('hide');
                    
                })
                $('.pageList_tab_son li').on('click',function(){
                    $(this).addClass('pageList_tab_active').siblings().removeClass('pageList_tab_active');
                })
                pagenum = $('.loading').attr('data-num');
                
                if(sonid == undefined){
                        // console.log(sonid)
                       sonid = $('.pageList_tab_son_box:eq(0) li:eq(0)').data('id');
                   }
                   $('.loading').on('click',function(){
                    pagenum = pagenum*1 + 1;
                    $('.loading').attr('data-num',pagenum);
                    headlist(sonid,pagenum,2)
                })
                 $('.pageList_tab_father li').on('click',function(){
                     pagenum = 1;
                      $('.loading').attr('data-num',pagenum);
                     
                      
                 })  
                 $('.pageList_tab_son li').on('click',function(){
                     pagenum = 1;
                      $('.loading').attr('data-num',pagenum);
                 })
                   headlist(sonid,pagenum,1)
                $('.pageList_tab_father li').on('click',function(){
                    var ceshiid =  $(this).attr('data-id');
                  initSonNun =  $('.pageList_tab_son:eq('+fatherindex+') li:eq(0)').attr('data-id');
                    console.log('---------------'+ceshiid)
                    if(typeof(initSonNun) == 'undefined'){
                        $('.pageList_tab_son_box').hide();
                        $('.pageList_tab_list').css('margin-top','0.27rem');
                        headlist(ceshiid,1,1)
                    }else{
                        $('.pageList_tab_son_box').show();
                         $('.pageList_tab_list').css('margin-top','0');
                        headlist(initSonNun,1,1)
                    }
                })
                $('.pageList_tab_son li').on('click',function(){
                   sonid =  $(this).data('id');
                //    console.log(sonid)
                   
                   headlist(sonid,pagenum,1)
                })

            }
        })
    }
    

    function headlist(sonid,pagenum,tianjia) {
        //加密
        var senddata = {};
        senddata.signature = "EB6EB8B669BA4846";
        senddata.page = pagenum;
        senddata.pagesize = 4;
        senddata.category_id = sonid
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: commonUrl + '/article/article-list',
            data: senddata,
            contentType: 'text/plain',
            async: true,
            dataType: 'json',
            success: function (res) {
                res.comurl = comurl;
                // console.log(res)
                var rq = res.data.length
                for(var i =0;i<rq;i++){
                    str = res.data[i].create_time;
                    // console.log(str)
                    str = str.substring(0, 10);
                    // console.log(str)
                    res.data[i].create_time = str;
                }
                // console.log(tianjia)
                if(tianjia == 1){
                    var html = template('headlist', res);
                    $('.pageList_tab_list').html(html);
                }else if(tianjia == 2){
                    var html = template('headlist', res);
                    $('.pageList_tab_list').append(html);
                }
                

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
                 console.log('!!!!!!!!!')
                 console.log(res)
                var html = template('marvel', res);

                $('.pageList_marvellous').append(html);
            }
        })
    }
    allLook()
    head()
    jctj()

})
