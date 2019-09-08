const postsData = require('../models/postsData.js')

module.exports = {
    getAllPost: function (req, res) {
        let query = req.query
        // console.log(query)
        // 调用module处理
        postsData.postsData(query, (err, result) => {
            if (err) return res.json({
                "code": 400,
                "msg": "数据库异常"
            })
            if (result) return res.json({
                "code": 200,
                "msg": "获取数据成功",
                "data": result.data,
                "totalData": result.sum
            })
        })
    },
    getCateData: function (req, res) {
        // 调用module获取数据
        postsData.cateData((err, result) => {
            if(err){
                res.json({
                    "code":400,
                    "msg":"数据库异常"
                })
            }else{
                // console.log(result)
                res.json({
                    "code":200,
                    "msg":"获取分类成功",
                    "data":result
                })
            }
        })
    }
}