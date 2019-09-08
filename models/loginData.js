// 调用自定义连接模块
const conn = require('../utils/conn.js')
module.exports = {
    loginData: function (email, callback) {
        // 声明sql语句
        let sqlStr = 'select * from users where email=?'
        conn.query(sqlStr, [email], (err, result) => {
            if(err){
                callback(err)
            }else {
               
                callback(null,result[0])
            }
        })
    }
}