const postsData = require('../models/postsData.js')
const moment = require('moment')
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
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "数据库异常"
                })
            } else {

                // console.log(result)
                res.json({
                    "code": 200,
                    "msg": "获取分类成功",
                    "data": result
                })
            }
        })
    },
    getDelPostById: function (req, res) {
        // 获取当前的请求中的id
        let id = req.query.id
        // 调用数据处理方法
        postsData.delPostById(id, (err) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "删除文章失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "删除文章数据成功"
                })
            }
        })
    },
    postNewPost: function (req, res) {
        let newPostInfo = req.body
        newPostInfo.user_id = req.session.loginUser.id
        newPostInfo.id = null
        newPostInfo.views = 0
        newPostInfo.likes = 0
        // console.log(newPostInfo)
        postsData.addNewPost(newPostInfo, (err) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "新增文章失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "新增文章成功"
                })
            }
        })
    },
    getEditPostById: function (req, res) {
        // 获取当前请求中的id
        let id = req.query.id
        postsData.getEditPostById(id, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "数据库异常获取文章信息失败"
                })
            } else {
                result[0].created = moment(result.created).format('YYYY-MM-DDTHH:mm:ss')
                res.json({
                    "code": 200,
                    "msg": "获取文章信息成功",
                    "data": result
                })
            }
        })

    },
    postUpdataPost: function (req, res) {
        let updataPost = req.body
        // console.log(updataPost)
        postsData.postUpdataPost(updataPost, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "编辑文章数据失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "编辑文章数据成功"
                })
            }
        })
    },
    postNewCate: function (req, res) {
        let newCateInfo = req.body
        newCateInfo.id = null
        postsData.postNewCate(newCateInfo, (err, result) => {
            if(err){
                res.json({
                    "code":400,
                    "msg":"新增分类失败"
                })
            }else{
                res.json({
                    "code":200,
                    "msg":"新增分类成功"
                })
            }
        })
    }

}