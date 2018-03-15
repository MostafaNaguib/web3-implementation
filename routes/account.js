var express = require('express');
var web3 = require('../config/web3-config');
var router = express.Router();

/* GET Account home page. */
router.get('/', function(req, res, next) {
    pwd = req.query.pwd;
    res.render('account/new', { title: 'New Account',pwd:pwd });
});

router.post('/new', function(req, res, next) {
    password = req.body.password1;
    password2 = req.body.password2;
    if(password != password2)
        res.redirect('/account?pwd=1');
    var account = web3.personal.newAccount(password);
    res.render('account/created', { title: 'Account created',account:account });
});


module.exports = router;
