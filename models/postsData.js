// 连接数据库
const conn = require('../utils/conn.js')

module.exports = {
    postsData: (callback) => {
        let sqlStr = `SELECT posts.*,users.nickname,categories.name
                      FROM posts
                      JOIN categories ON posts.category_id = categories.id
                      JOIN users ON posts.user_id=users.id`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                callback(err)
            } else {

                callback(null, result)
            }
        })
    }
}