const HomeModel = require('../models/user')


module.exports = {
    index
}

function index(req, res){
    //then we want to send an ejs index page to browser
  
        console.log('Homepage route handler called')
        res.render('index', {title: 'Home'});
    }
