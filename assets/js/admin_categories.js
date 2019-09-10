

$(function () {
    $.ajax({
        type: 'get',
        url: '/getCateData',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                let htmlStr = template('cateList', res.data)
                // console.log(htmlStr)
                $('tbody').html(htmlStr)
            }
        }
    })
})