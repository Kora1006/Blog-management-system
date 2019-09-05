const express = require('express')
const router = express.Router()
const pageController = require('./controllers/pageController.js')


router.get('/', pageController.getIndexPage)  //渲染主页
.get('/list', pageController.getListPage)  //渲染列表页
.get('/detail', pageController.getDetailPage)  //渲染详细页
 // 渲染后台主页
 .get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })

// 暴露
module.exports = router