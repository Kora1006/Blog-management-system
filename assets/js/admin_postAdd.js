$(function () {
    // 替换页面中原有文本框
    CKEDITOR.replace('content')
   
    // 如果当前是以编辑文章的形式打开页面需要获取文章信息进行页面渲染
    let editId = utils.getData(location.search)
    $.ajax({
        type:'get',
        url:'/getEditPostById',
        data:{
            id:editId.id
        },
        dataType:'json',
        success:function(res){
            // console.log(res)
            if(res.code == 200){
                console.log(res.data)
                let data = res.data[0]
                $('#id').val(data.id)
                $('#title').val(data.title)
                $('#content').val(data.content)
                $('#slug').val(data.slug)
                $('#category_id').val(data.category_id)
                $('#status').val(data.status)
                // 图片路径
                $('#uploadFileInfo').val(data.feature)
                $('.thumbnail').attr('src','/uploads/'+data.feature).show()
                $('#created').val(data.created)


            }

        }
    })

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
                if (res.code == 200) {
                    // 将获取的上传的图片的路径保存在隐藏域中
                    $('#uploadFileInfo').val(res.data)
                    // 将图片路径存放在图片展示区并显示
                    $('.thumbnail').show().attr('src', '/uploads/' + res.data)

                } else {
                    $('.alert-danger>span').text(res.msg).show()
                }
            }
        })
    })

    //  声明点击保存时触发Ajax新增文章
    $('.btn-primary').on('click', function (event) {
        event.preventDefault()
         // 实现数据同步
        CKEDITOR.instances.content.updateElement()
        $.ajax({
            type:'post',
            url:'/postNewPost',
            dataType:'json',
            data:$('form').serialize(),
            success:function (res) {
                // 页面提示新增成功/失败并实现跳转到总文章页面
                $('#editInfo>span').text(res.msg).show()
               if(res.code == 200){
                $('#editInfo').addClass('alert-success').removeClass('alert-danger').fadeIn(200).delay(2000).fadeOut(200)
               }else{
                $('#editInfo').addClass('alert-danger').removeClass('alert-success').fadeIn(200).delay(2000).fadeOut(200)
               }
               setTimeout(()=>{
                   location.href='/admin/posts'
               },2400)
              }
        })
    })

})