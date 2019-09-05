//引入模块
const mysql = require('mysql')

// 创建连接对象
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})
// 连接数据库
conn.connect()

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