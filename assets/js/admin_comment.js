$(function () {
    // 定义分页数据
    let pageNum = 1  //当前页码
    let pageSize =   $('#showDataSize').val()//每页显示条数
    // 页面初始化即获取评论信息
    function init() {
        $.ajax({
            type: 'get',
            url: '/getCommentData',
            data:{
                pageNum,
                pageSize
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    console.log(res)
                    let totalPages = res.totalData / pageSize
                    let htmlStr = template('commentDataList', res.data)
                    $('tbody').html(htmlStr)
                    setPage(Math.ceil(totalPages))
                }
            }
        })
    }
    init()

    // 动态生成分页结构
    function setPage(totalPages) {
        $('#pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: pageNum,
            totalPages: totalPages,
            onPageClicked: function (event, originalEvent, type, page) {
                pageNum = page
                init()
            }
        })
    }
    // 页面显示条数变化时
    $('#showDataSize').on('change', function () {
        pageSize = $(this).val()
        pageNum = 1
        init()
    })

    // 点击全选框时选择所有分类的复选框并显示批量删除
    $('#checkAll').on('change', function () {
        let checkStatus = $(this).prop('checked')  //判断当前全选框的状态
        if (checkStatus) {
            $('tbody .checkSingle').prop('checked', true)
            $('.btn-batch').show()
        } else {
            $('tbody .checkSingle').prop('checked', false)
            $('.btn-batch').hide()
        }
        let checkNum = $('tbody .checkSingle:checked').length
        if (checkNum > 1) {
            $('.btn-batch').show()
        } else {
            $('.btn-batch').hide()
        }
    })

    // 给单个的复选框注册点击事件（事件委托）
    $('tbody').on('click', '.checkSingle', function () {
        let checkNum = $('tbody .checkSingle:checked').length
        if (checkNum > 1) {
            $('.btn-batch').show()
        } else {
            $('.btn-batch').hide()
        }
        let checkBoxNum = $('tbody .checkSingle').length
        if (checkBoxNum == checkNum) {
            $('#checkAll').prop('checked', true)
        } else {
            $('#checkAll').prop('checked', false)
        }
    })
       // 封装单条评论处理事件
       function contrComment(url,id) {  
        $.ajax({
            type: 'get',
            url: url,
            data: {
                id:id
            },
            dataType: 'json',
            success: function (res) {
                utils.alertResult(res, $('#commentInfo'))
                $('#commentInfo>span').text(res.msg)
                init()
            }
        })
    }

    // 注册事件委托完成删除评论
    $('tbody').on('click', '.btnDel', function () {

        if (confirm('是否删除该评论')) {
            let id = $(this).data('id')
           contrComment('/getDelCommentById',id)
        }
    })
 
    // 注册事件委托完成驳回评论
    $('tbody').on('click', '.btnReject', function () {

        if (confirm('是否驳回该评论')) {
            let id = $(this).data('id')
            contrComment('/getRejectCommentById',id)
        }
    })
    // 注册事件委托完成批准评论
    $('tbody').on('click', '.btnAppro', function () {
            let id = $(this).data('id')
            contrComment('/getApproCommentById',id)
    })

})