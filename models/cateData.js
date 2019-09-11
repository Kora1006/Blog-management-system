const conn = require('../utils/conn.js')
module.exports = {
    cateData: (callback) => {
        let sqlStr = 'SELECT categories.* FROM categories'
        conn.query(sqlStr, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    postNewCate: (newCateInfo, callback) => {
        let sqlStr = 'INSERT INTO categories set ?'
        conn.query(sqlStr, [newCateInfo], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    postEditCateInfo: (editCateInfo, callback) => {

        let sqlStr = 'UPDATE categories SET ? WHERE id= ?'
        conn.query(sqlStr, [editCateInfo, editCateInfo.id], (err, result) => {

            if (err) {

                callback(err)

            } else {
                callback(null)
            }
        })
    },
    delCateById: (id, callback) => {
        let sqlStr = `DELETE FROM categories WHERE id in (${id})`
        conn.query(sqlStr,(err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}