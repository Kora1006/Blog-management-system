const conn = require('../utils/conn.js')
module.exports = {
    getSettingData: (callback) => {
        let sqlStr = 'SELECT `options`.* FROM `options` WHERE id <9'
        conn.query(sqlStr, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    getNavMenusData: (callback) => {
        let sqlStr = 'SELECT `options`.* FROM `options` WHERE id =9'
        conn.query(sqlStr, (err, result) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    }

}