const formidable = require('formidable')
const path = require('path')

module.exports = {
  postUploadFile: function (req, res) {
    // 创建formidable对象
    let formida = new formidable.IncomingForm()
    // 配置编码格式
    formida.encoding = 'utf-8'
    // 配置上次文件存储目录
    formida.uploadDir = __dirname + '/../uploads'
    // 保留扩展名
    formida.keepExtensions = true
    // 实现文件上传
    formida.parse(req, (err, fields, files) => {
      if(err){
        res.json({
          "code":400,
          "msg":"文件上传失败"
        })
      }else{
        // console.log(fields)
        // console.log('-----------------------------')
        // console.log(files)
        res.json({
          "code":200,
          "msg":"文件上传成功",
          "data":path.basename(files.uploadFile.path)
        })
      }
    })
  }
}