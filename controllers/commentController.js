const commentData = require('../models/commentData.js')
module.exports = {
    getCommentData: (req, res) => {
        let query = req.query
        commentData.getCommentData(query,(err,result) => {
            if(err){
                res.json({
                    "code":400,
                    "msg":"获取用户评论信息失败"
                })
            }else{
                res.json({
                    "code":200,
                    "msg":"获取用户评论信息成功",
                    "data":result.data,
                    "totalData": result.sum
                })
            }
        })
    }
}