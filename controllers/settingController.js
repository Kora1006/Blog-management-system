const settingData = require('../models/settingData')
module.exports = {
    getSettingData: (req, res) => {
        settingData.getSettingData((err, result) => {
            if (err) {
                res.json({
                    "code": 400,
                    "msg": "获取网页设置信息失败"
                })
            } else {
                res.json({
                    "code": 200,
                    "msg": "获取网页设置信息成功",
                    "data": result
                })
            }
        })
    },
    getNavMenusData: (req, res) => {
        settingData.getNavMenusData((err, result) => {
            if(err){
                res.json({
                    "code":400,
                    "msg":"获取导航菜单信息失败"
                })
            }else{
                res.json({
                    "code":200,
                    "msg":"获取导航菜单信息成功",
                    "data":result
                })
            }
        })
    }
}

