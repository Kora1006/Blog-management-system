const conn = require('../utils/conn.js')

module.exports = {
    getCommentData: (query, callback) => {
        let sqlstr = `SELECT comments.*,posts.title
        FROM comments
        JOIN posts ON comments.post_id=posts.id
        ORDER BY comments.id DESC
        LIMIT ${(query.pageNum - 1) * query.pageSize},${query.pageSize}`
        conn.query(sqlstr, (err, result1) => {
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
    getDelCommentById: (id, callback) => {
        let sqlStr = `DELETE FROM comments WHERE id in (${id})`
        conn.query(sqlStr, (err) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    getRejectCommentById:(id,callback)=>{
        let sqlStr =`UPDATE comments SET c_status='rejected' WHERE id in (${id})`
        conn.query(sqlStr,(err)=>{
            if(err){
               
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    getApproCommentById:(id,callback)=>{
        let sqlStr = `UPDATE comments SET c_status='approved' WHERE id in (${id})`
        conn.query(sqlStr,(err)=>{
            if(err){
                
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}