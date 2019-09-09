$(function () {
    // 替换页面中原有文本框
CKEDITOR.replace('content')
// 实现数据同步
var data = CKEDITOR.instances.content.getData();
})