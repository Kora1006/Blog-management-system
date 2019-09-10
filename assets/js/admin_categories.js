

$(function () {
    // ajax发送请求获取页面分类数据
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

    // 管理复选框
    // 点击全选框时选择所有分类的复选框并显示批量删除
    $('#checkAll').on('change', function () {
        let checkStatus = $(this).prop('checked')  //判断当前全选框的状态
        if (checkStatus) {
            $('tbody .checkSingle').prop('checked', true)
            $('.btn-sm').show()
        } else {
            $('tbody .checkSingle').prop('checked', false)
            $('.btn-sm').hide()
        }
        let checkNum = $('tbody .checkSingle:checked').length
        if(checkNum >1){
            $('.btn-sm').show()
        }else{
            $('.btn-sm').hide()
        }
    })

    // 给单个的复选框注册点击事件（事件委托）
    $('tbody').on('click', '.checkSingle', function () {
        let checkNum = $('tbody .checkSingle:checked').length
        if(checkNum >1){
            $('.btn-sm').show()
        }else{
            $('.btn-sm').hide()
        }
       let checkBoxNum = $('tbody .checkSingle').length
       if(checkBoxNum == checkNum){
           $('#checkAll').prop('checked',true)
       }else{
        $('#checkAll').prop('checked',false)
       }
    })
})