$(function () {
    // 获取页面元素
    let menuPosts = $('#menu-posts')
    let menuSettings = $('#menu-settings')

    // 获取当前页面的url中的是否含有参数(返回包含？的第一个索引值)
    let dataIndex = location.href.indexOf('?')
    // 声明一个空字符串保存当前页面路由
    let routerName = ''
    // 对当前的url进行处理
    if (dataIndex == -1) {
        // 不包括参数
        routerName = location.href.substring(location.href.lastIndexOf('/')+1)
    }else{
        // 包括参数
        routerName = location.href.substring(location.href.lastIndexOf('/')+1,dataIndex)

    }
    // 判断当前的routerName在哪个列表页中
    if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
        menuPosts.addClass('in').attr('aria-expanded','true')
        menuPosts.prev('a').removeClass('collapsed').attr('aria-expanded','true')
    }else if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
        menuSettings.addClass('in').attr('aria-expanded','true')
    }
  

    // 实现选定的栏目高亮效果
    $('#'+routerName).addClass('active')
     
    

})