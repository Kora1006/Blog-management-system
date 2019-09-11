$(function () {
    // 定义分页数据
    let pageNum = 1  //当前页码
    let pageSize = 2 //每页显示条数
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
})