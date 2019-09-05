const express = require('express')
const router = require('./router.js')
const bodyParser = require('body-parser')


const app = express()



// 设置渲染引擎
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// 托管静态资源
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 解析post数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.listen(3004, () => {
    console.log('running at http://127.0.0.1:3004')
})
// 调用路由
app.use(router)