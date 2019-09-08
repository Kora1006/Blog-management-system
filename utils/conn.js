//引入模块
const mysql = require('mysql')



// 创建连接对象
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu',
    dateStrings:true
})


module.exports = conn