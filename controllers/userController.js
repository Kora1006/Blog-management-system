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
                        // 使用session
                        req.session.isLogin = 'true'
                        req.session.loginUser =result
                        // console.log(req.session)
                            res.json({
                                "code": 200,
                                "msg": "登录成功"
                            })
                        // 使用cookie处理
                        // res.writeHead(200, {
                        //     'Set-Cookie': 'isLogin=true'
                        // })
                        // // writeHead和json冲突
                        // res.end(JSON.stringify({
                        //     "code": 200,
                        //     "msg": "登录成功"
                        // }))
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
    },
    logOut: (req, res) => {
        req.session.isLogin = ''
        res.json({
            "code": 200,
            "msg": "已成功清除session内容"
        })
    }
}