$(function () {
    // 获取页面数据渲染
    function init() {
        $.ajax({
            type: 'get',
            url: '/getSettingData',
            dataType: 'json',
            success: function (res) {
                if (res.code = 200) {
                    let htmlStr = template('settingInfos', res.data)
                    console.log(htmlStr)
                    $('form').html(htmlStr)
                }
            }
        })
    }
    init()

})