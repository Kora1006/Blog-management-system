const commentData = require('../models/commentData.js')
module.exports = {
    getCommentData: (req, res) => {
        let query = req.query
        commentData.getCommentData(query, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "获取用户评论信息失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "获取用户评论信息成功",
                    "data": result.data,
                    "totalData": result.sum
                })
            }
        })
    },
    getDelCommentById: (req, res) => {
        let id = req.query.id
        commentData.getDelCommentById(id, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "删除评论失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "删除评论成功"
                })
            }
        })
    },
    getRejectCommentById: (req, res) => {
        let id = req.query.id
        commentData.getRejectCommentById(id, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "驳回评论失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "驳回评论成功"
                })
            }
        })
    },
    getApproCommentById: (req, res) => {
        let id = req.query.id
        commentData.getApproCommentById(id,(err,result)=>{
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "批准评论失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "批准评论成功"
                })
            }
        })
    }
}