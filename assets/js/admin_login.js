$(function () {
    $('.btn-login').on('click', function () {

        $.ajax({
            type: 'post',
            url: '/login',
            data: $('form').serialize(),
            dataType: 'json',
            beforeSend: function () {
                // 判断此时输入的邮箱和密码格式是否正确
                let email = $('#email').val()
                let password = $('#password').val().trim()
                if (!/\w+[@]\w+[.]\w/.test(email)) {
                    $('.alert-danger>span').text('请输入正确的邮箱')
                    $('.alert-danger').fadeIn(300).delay(2000).fadeOut(300)
                    return false
                } else if (password.length < 6 || password.length > 16) {
                    $('.alert-danger>span').text('请输入正确的密码格式')
                    $('.alert-danger').fadeIn(300).delay(2000).fadeOut(300)
                    return false
                }

            },
            success: function (res) {
              if(res.code == 400){
                $('.alert-danger>span').text(res.msg)
                $('.alert-danger').fadeIn(300).delay(2000).fadeOut(300)
              }else if(res.code == 200){
                  location.href = '/admin'
              }
            }
        })
    })
})