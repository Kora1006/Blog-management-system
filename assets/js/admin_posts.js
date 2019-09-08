
$(function () {
    // 定义分页相关的数据
    let pageNum = 1  //当前页码
    let pageSize = 1 //每页显示条数
    // 获取当前页面显示条数的数据
    $('#showDataSize').val(pageSize)

    // 封装调用ajax的函数
    function init() {
        $.ajax({
            type: 'get',
            url: '/getAllPosts',
            dataType: 'json',
            data: {
                pageNum,
                pageSize
            },
            success: function (res) {
                console.log(res)
                let totalPages = res.totalData / pageSize
                let htmlStr = template('postList', res)
                // console.log(htmlStr)
                $('tbody').html(htmlStr)
                setPage(Math.ceil(totalPages))
            }
        })
    }
    // 先调用init获取页面数据
    init()

    // 当页面加载时获取分类信息并渲染至页面
    $.ajax({
        type: 'get',
        url: '/getCateData',
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            let htmlStr = '<option value="">所有分类</option>'
            res.data.forEach(function (value) {
                htmlStr +=`<option value="${value.id}">${value.name}</option>`
            })
            console.log(htmlStr)
            $('#cateList').html(htmlStr)
        }
    })

    // 当用户规定当前显示的页数改变的时候
    $('#showDataSize').on('change', function () {
        pageSize = $(this).val()
        pageNum = 1
        init()
    })

    // 动态生成分页结构
    function setPage(totalPages) {
        $('.pagination').bootstrapPaginator({
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