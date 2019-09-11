const cateData = require('../models/cateData.js')
const moment = require('moment')
module.exports = {
    getCateData: function (req, res) {
        // 调用module获取数据
        cateData.cateData((err, result) => {
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
    postNewCate: function (req, res) {
        let newCateInfo = req.body
        newCateInfo.id = null
        cateData.postNewCate(newCateInfo, (err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "新增分类失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "新增分类成功"
                })
            }
        })
    },
    postEditCateInfo: function (req, res) {
        let editCateInfo = req.body
        // console.log(editCateInfo)
        cateData.postEditCateInfo(editCateInfo, (err, result) => {

            if (err) {
                res.json({
                    "code": 400,
                    "msg": "修改分类信息失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "修改分类信息成功"
                })
            }
        })
    },
    getDelCateById: function (req, res) {
        let id = req.query.id
        cateData.delCateById(id,(err,result)=>{
            if(err){
                res.json({
                    "code":400,
                    "msg":"删除分类失败"
                })
            }else{
                res.json({
                    "code":200,
                    "msg":"删除分类成功"
                })
            }
        })

    }

}