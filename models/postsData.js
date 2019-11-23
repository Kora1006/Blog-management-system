// 连接数据库
const conn = require('../utils/conn.js')
const uuid = require('node-uuid');



module.exports = {
    postsData: (query, callback) => {
        let sqlStr = `SELECT posts.*,users.nickname,categories.name
                      FROM posts
                      JOIN categories ON posts.category_id = categories.id
                      JOIN users ON posts.user_id=users.id
                      where 1=1 `
        if (query.cateInfo && query.cateInfo != 'all') {
            sqlStr += ` AND posts.category_id = '${query.cateInfo}'`
        }
        if (query.pulishInfo && query.pulishInfo != 'all') {
            sqlStr += ` AND posts.status='${query.pulishInfo}'`
        }
        sqlStr += ` ORDER BY posts.id DESC
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
    
    delPostById: (id, callback) => {
        let sqlStr = 'DELETE FROM posts WHERE id = ' + id
        conn.query(sqlStr, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    addNewPost: (newPostInfo, callback) => {

        // v1 根据时间戳和随机数生成的uuid
        const creatuuid= uuid.v1()
        newPostInfo.id=creatuuid
        let sqlStr = 'INSERT INTO posts set ?'
        conn.query(sqlStr, newPostInfo, (err, result) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    getEditPostById: (id, callback) => {
        let sqlStr = 'SELECT posts.* FROM posts WHERE id =' + id
        conn.query(sqlStr, (err, result) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    postUpdataPost: (updataPost, callback) => {
        let sqlStr = 'UPDATE posts SET ? WHERE id=?'
        conn.query(sqlStr, [updataPost, updataPost.id], (err, result) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}