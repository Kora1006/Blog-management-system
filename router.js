const express = require('express')
const router = express.Router()
const pageController = require('./controllers/pageController.js')
const userController = require('./controllers/userController.js')
const postController = require('./controllers/postController.js')
const uploadController = require('./controllers/uploadController.js')

// 页面渲染部分
// 渲染前台用户页面
router.get('/', pageController.getIndexPage)  
.get('/list', pageController.getListPage)  
.get('/detail', pageController.getDetailPage)  
 // 渲染后台管理页面
 .get('/admin',pageController.getAdminIndexPage)
 .get('/admin/login',pageController.getLoginPage)
 .get('/admin/categories',pageController.getAdminCategoriesPage)
 .get('/admin/comments',pageController.getAdminCommentsPage)
 .get('/admin/nav-menus',pageController.getAdminNavMenusPage)
 .get('/admin/password-reset',pageController.getAdminPasswordResetPage)
 .get('/admin/post-add',pageController.getAdminPostAddPage)
 .get('/admin/posts',pageController.getAdminPostsPage)
 .get('/admin/profile',pageController.getAdminProfilePage)
 .get('/admin/settings',pageController.getAdminSettingPage)
 .get('/admin/slides',pageController.getAdminSlidesPage)
 .get('/admin/users',pageController.getAdminUsersPage)
// 业务处理
.post('/login',userController.login)     //登录业务
.get('/logOut',userController.logOut)   //退出登录
.get('/getAllPosts',postController.getAllPost)  //全部文章列表
.get('/getCateData',postController.getCateData)   //获取文章的分类信息
.get('/getDelPostById',postController.getDelPostById) //删除文章
.post('/postUploadFile',uploadController.postUploadFile)  //上传文件
 // 暴露
module.exports = router