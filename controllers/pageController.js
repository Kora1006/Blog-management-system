module.exports = {
    // 渲染前台用户页面
    getIndexPage: (req, res) => {
        res.render('index.ejs')
    },
    getListPage: (req, res) => {
        res.render('list.ejs')
    },
    getDetailPage: (req, res) => {
        res.render('detail.ejs')
    },
    // 渲染后台管理页面
    getLoginPage: (req, res) => {
        res.render('admin/login.ejs')
    },
    getAdminIndexPage: (req, res) => {
        res.render('admin/index.ejs')
    },
    getAdminCategoriesPage:(req,res)=>{
        res.render('admin/categories.ejs')
    },
    getAdminCommentsPage:(req,res)=>{
        res.render('admin/comments.ejs')
    },
    getAdminNavMenusPage:(req,res)=>{
        res.render('admin/nav-menus.ejs')
    },
    getAdminPasswordResetPage:(req,res)=>{
        res.render('admin/password-reset.ejs')
    },
    getAdminPostAddPage:(req,res)=>{
        res.render('admin/post-add.ejs')
    },
    getAdminPostsPage:(req,res)=>{
        res.render('admin/posts.ejs')
    },
    getAdminProfilePage:(req,res)=>{
        res.render('admin/profile.ejs')
    },
    getAdminSettingPage:(req,res)=>{
        res.render('admin/settings.ejs')
    },
    getAdminSlidesPage:(req,res)=>{
        res.render('admin/slides.ejs')
    },
    getAdminUsersPage:(req,res)=>{
        res.render('admin/users.ejs')
    }

}