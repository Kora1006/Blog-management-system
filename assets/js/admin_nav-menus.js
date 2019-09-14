$(function () {
    function init() {
        $.ajax({
            type: 'get',
            url: '/getNavMenusData',
            dataType: 'json',
            success: function (res) {
                //  console.log(res.data[0].value)
                if (res.code == 200) {
                    let htmlStr= template('navMenusInfo',JSON.parse(res.data[0].value))
                    console.log(htmlStr)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    init()
})