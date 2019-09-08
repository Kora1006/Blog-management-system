
$(function () {
$.ajax({
    type:'get',
    url:'/getAllPosts',
    dataType:'json',
    data:{},
    success:function(res){
        console.log(res)
        let htmlStr = template('postList',res)
        console.log(htmlStr)
        $('tbody').html(htmlStr)
    }
})
})