

$(function () {
    // ajax发送请求获取页面分类数据(封装初始化函数))
    function init() {
        $.ajax({
            type: 'get',
            url: '/getCateData',
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                if (res.code == 200) {
                    let htmlStr = template('cateList', res.data)
                    // console.log(htmlStr)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    //   调用初始化函数获取当前页面信息
    init()
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
        if (checkNum > 1) {
            $('.btn-sm').show()
        } else {
            $('.btn-sm').hide()
        }
    })

    // 给单个的复选框注册点击事件（事件委托）
    $('tbody').on('click', '.checkSingle', function () {
        let checkNum = $('tbody .checkSingle:checked').length
        if (checkNum > 1) {
            $('.btn-sm').show()
        } else {
            $('.btn-sm').hide()
        }
        let checkBoxNum = $('tbody .checkSingle').length
        if (checkBoxNum == checkNum) {
            $('#checkAll').prop('checked', true)
        } else {
            $('#checkAll').prop('checked', false)
        }
    })

    // 注册点击新增事件
    $('.btnAdd').on('click', function (event) {
        event.preventDefault()
        $.ajax({
            type: 'post',
            url: '/postNewCate',
            dataType: 'json',
            data: $('form').serialize(),
            success: function (res) {

                utils.alertResult(res, $('#addCateInfo'))
                $('#addCateInfo>span').text(res.msg)
                setTimeout(() => {
                    $('#name').val(" ")
                    $('#slug').val(" ")
                    init()
                }, 2400)
            }
        })
    })

    //注册点击单个编辑事件
    $('tbody').on('click', '.btnEditCate', function () {

        $('#name').val($(this).data('name'))
        $('#slug').val($(this).data('slug'))
        $('#cateID').val($(this).data('id'))
        $('.btnEdit').show()
        $('.btnAdd').hide()
        $('.cateInfo').text('编辑分类信息')
    })
    // 注册点击编辑提交事件
    $('.btnEdit').on('click', function (event) {
        event.preventDefault()
        $.ajax({
            type: 'post',
            url: '/postEditCateInfo',
            dataType: 'json',
            data: $('form').serialize(),
            success: function (res) {
                // console.log(res)
                utils.alertResult(res, $('#addCateInfo'))
                $('#addCateInfo>span').text(res.msg)
                setTimeout(() => {
                    $('#name').val(" ")
                    $('#slug').val(" ")
                    $('.btnEdit').hide()
                    $('.btnAdd').show()
                    $('.cateInfo').text('添加新分类目录')
                    init()

                }, 2400)
            }
        })

    })

    // 注册点击单个删除事件
    $('tbody').on('click', '.btnDelCate', function () {
        let id = $(this).data('id')
        $.ajax({
            type: 'get',
            url: '/getDelCateById',
            dataType: 'json',
            data: {
                id
            },
            success: function (res) {
                // console.log(res)
                utils.alertResult(res, $('#addCateInfo'))
                $('#addCateInfo>span').text(res.msg)
                setTimeout(() => {
                    init()
                }, 2400)
            }
        })
    })

    // 注册批量删除事件
    $('.btnDel').on('click', function () {
        // 获取当前已点击了复选框的元素的id
        let checkNum = $('.checkSingle:checked')
        let idArr = []
        // 遍历获取到的被点击的复选框
        for (var i = 0; i < checkNum.length; i++) {
            idArr.push($(checkNum[i]).data('id'))
        }
        // console.log(idArr.join(','))
        $.ajax({
            type: 'get',
            url: '/getDelCateById',
            dataType: 'json',
            data: {
                id: idArr.join(',')
            },
            success: function (res) {
                // console.log(res)
                utils.alertResult(res, $('#addCateInfo'))
                $('#addCateInfo>span').text(res.msg)
                setTimeout(() => {
                    $('.btnDel').hide()
                    init()
                }, 2400)
            }
        })
    })
})