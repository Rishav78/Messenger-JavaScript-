function serveHomePage(req, res){
    res.render('index');
}

module.exports = {
    serveHomePage,
}