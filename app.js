const express = require('express')
const router = require('./router.js')
const bodyParser = require('body-parser')
const querystring = require('querystring')


const app = express()



// 设置渲染引擎
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// 托管静态资源
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 解析post数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由中间件——判断cookie
app.use(function (req, res, next) {
    let reqObj = querystring.parse(req.headers.cookie)
    // // 登录页、前台页面、以及已经有登录状态不需要被“拦截”
    if (reqObj.isLogin && reqObj.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1){
        next()
    }
 
    else{
        // 重定向
        res.redirect('/admin/login')
    }

})

app.listen(3004, () => {
    console.log('running at http://127.0.0.1:3004/admin/login')
})
// 调用路由
app.use(router)