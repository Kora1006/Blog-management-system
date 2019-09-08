const postsData = require('../models/postsData.js')

module.exports = {
    getAllPost:function (req, res) {
        // 调用module处理
        postsData.postsData((err, result) => {
            if (err)return res.json({
                    "code":400,
                    "msg":"数据库异常"
                })
            if(result)return res.json({
                "code":200,
                "msg":"获取数据成功",
                "data":result
            })
        })
    }
}