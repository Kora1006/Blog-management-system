const express = require('express')
const router = express.Router()
const pageController = require('./controllers/pageController.js')


router.get('/', pageController.getIndexPage)  //渲染主页
.get('/list', pageController.getListPage)  //渲染列表页
.get('/detail', pageController.getDetailPage)  //渲染详细页
 // 渲染后台主页
 .get('/admin',pageController.getAdminIndexPage)
 .get('/admin/login',pageController.getLoginPage)
 .get('/admin/categories',pageController.getAdminCategoriesPage)
 .get('/admin/comments',pageController.getAdminCommentsPage)
 .get('/admin/nav-menus',pageController.getAdminNavMenusPage)
 .get('/admin/password-reset',pageController.getAdminPasswordResetPage)
 .get('/admin/post-add',pageController.getAdminPostAddPage)
 .get('/admin/posts',pageController.getAdminPostsPage)
 .get('/admin/profile',pageController.getAdminProfilePage)
 .get('/admin/setting',pageController.getAdminSettingPage)
 .get('/admin/slides',pageController.getAdminSlidesPage)
 .get('/admin/users',pageController.getAdminUsersPage)

// 暴露
module.exports = router