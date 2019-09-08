// 连接数据库
const conn = require('../utils/conn.js')

module.exports = {
    postsData: (query, callback) => {
        let sqlStr = `SELECT posts.*,users.nickname,categories.name
                      FROM posts
                      JOIN categories ON posts.category_id = categories.id
                      JOIN users ON posts.user_id=users.id
                      ORDER BY posts.id DESC
                      LIMIT ${(query.pageNum - 1) * query.pageSize},${query.pageSize}`
        conn.query(sqlStr, (err, result1) => {
            if (err) {

                callback(err)
            } else {
                sqlStr = 'SELECT count(*) total FROM posts'
                conn.query(sqlStr, (err, result2) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, { data: result1, sum: result2[0].total })
                    }

                })

            }
        })
    },
    cateData: (callback) => {
        let sqlStr = 'SELECT categories.* FROM categories'
        conn.query(sqlStr,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    }
}