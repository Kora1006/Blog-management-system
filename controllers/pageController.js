module.exports = {
    getIndexPage: (req, res) => {
        res.render('index.ejs')
    },
    getListPage: (req, res) => {
        res.render('list.ejs')
    },
    getDetailPage: (req, res) => {
        res.render('detail.ejs')
    },
    getLoginPage: (req, res) => {

    }
}