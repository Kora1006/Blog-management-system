$(function () {
    // 替换页面中原有文本框
    CKEDITOR.replace('content')
    // 实现数据同步
    var data = CKEDITOR.instances.content.getData();

    // 获取当前页面的分类数据
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
            $('#category_id').html(htmlStr)
        }
    })
    // 声明当上传文件时触发的事件
    $('#feature').on('change', function () {
        // 先获取当前上传的文件信息
        let uploadFileInfo = $('#feature')[0].files[0]
        // console.log(uploadFileInfo)

        // 收集图片数据
        let formdata = new FormData()
        formdata.append('uploadFile', uploadFileInfo)
        console.log(formdata)
        // 发起ajax请求
        $.ajax({
            type: 'post',
            url: '/postUploadFile',
            dataType: 'json',
            data: formdata,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res)
                if (res.code == 200){
                    // 将获取的上传的图片的路径保存在隐藏域中
                    $('#uploadFileInfo').val(res.data)
                    // 将图片路径存放在图片展示区并显示
                    $('.thumbnail').show().attr('src','/uploads/'+res.data)

                }else{
                    $('.alert-danger>span').text(res.msg).show()
                }
              }
        })
    })
})