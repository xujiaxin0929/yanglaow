$(document).ready(function () {
    
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
    // // alert(1)
    // var city = remote_ip_info['city'];
    // city = city + '市';
    // if (city == '') {
    //     city == '北京市';
    // }
    // sessionStorage.setItem("localCity", city);
    // var haveCityspan = $('.city');
    // haveCityspan.html(city);
    // $('.hp_recommend_title>h4>i').html(city);

    // if(haveCityspan.text() == ''){
    //     haveCityspan.html('北京市');
    // }
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
            // cityAjax();
        }

    });
})

