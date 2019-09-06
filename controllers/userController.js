const loginData = require('../models/loginData.js')


module.exports = {
    login: (req, res) => {
        // 接收post过来的数据
        let userData = req.body

        // 调用数据处理中的方法
        loginData.loginData(userData.email, (err, result) => {
            if (err) {
                console.log(err)
                res.json({
                    "code": 400,
                    "msg": "数据库异常"
                })
            } else {
                if (result) {
                    if (result.password == userData.password) {
                        res.writeHead(200, {
                            'Set-Cookie':'isLogin=true'
                        })
                        // writeHead和json冲突
                        // res.json({
                        //     "code": 200,
                        //     "msg": "登录成功"
                        // })
                        res.end(JSON.stringify({
                            "code": 200,
                            "msg": "登录成功"
                        }))
                    } else {
                        res.json({
                            "code": 400,
                            "msg": "密码错误，请重新输入"
                        })
                    }
                } else {
                    res.json({
                        "code": 400,
                        "msg": "邮箱有误，请重新输入"
                    })
                }
            }
        })
    }
}