
$(function () {
    // 定义分页相关的数据
    let pageNum = 1  //当前页码
    let pageSize = 1 //每页显示条数
    // 获取当前页面显示条数的数据
    $('#showDataSize').val(pageSize)

    // 封装调用ajax获取文章数据的函数
    function init(search) {
        $.ajax({
            type: 'get',
            url: '/getAllPosts',
            dataType: 'json',
            data: {
                pageNum,
                pageSize,
                ...search
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


    // 当页面加载时获取分类信息并渲染至页面
    $.ajax({
        type: 'get',
        url: '/getCateData',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            let htmlStr = '<option value="all">所有分类</option>'
            res.data.forEach(function (value) {
                htmlStr += `<option value="${value.id}">${value.name}</option>`
            })
            // console.log(htmlStr)
            $('#cateList').html(htmlStr)
        }
    })

    // 获取当前选择的状态并及时调用获取页面数据
    var search = {}
    search.cateInfo = $('#cateList').val()
    search.pulishInfo = $('#publishList').val()
    // 先调用init获取页面数据
    init(search)

    // 当用户规定当前显示的页数改变的时候
    $('#showDataSize').on('change', function () {
        pageSize = $(this).val()
        pageNum = 1
        let search = {}
        search.cateInfo = $('#cateList').val()
        search.pulishInfo = $('#publishList').val()
        init(search)
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

    // 注册点选筛选时的事件
    $('.btn-sm').on('click', function () {
        //   声明一个变量存放当前选择的分类情况
        let search = {}
        search.cateInfo = $('#cateList').val()
        search.pulishInfo = $('#publishList').val()

        // 将选择的情况传给init
        init(search)
    })

    // 注册事件委托完成删除文章
    $('tbody').on('click', '.delBtn', function () {
       
        if(window.confirm('是否删除该文章')){
            $.ajax({
                type:'get',
                url:'/getDelPostById',
                data:{
                    id:$(this).data('id')
                },
                dataType:'json',
                success:function(res){
                    if(res.code == 400){
                        $('#alertInfo>span').text(res.msg)
                        $('#alertInfo').show().removeClass('alert-submit').addClass('alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                    }else{
                        $('#alertInfo>span').text(res.msg)
                        $('#alertInfo').show().removeClass('alert-danger').addClass('alert-submit').fadeIn(200).delay(2000).fadeOut(200)

                        // 还需要完成刷新页面功能
                    }
                }
            })
        }
    })
})