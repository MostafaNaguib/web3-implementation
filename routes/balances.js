var express = require('express');
var web3 = require('../config/web3-config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var balancesObj = {};
    web3.personal.listAccounts.forEach(function(account){
        balancesObj[account] = web3.eth.getBalance(account);
    });
    // console.log(balancesObj);
    res.render('balances', { title: 'Balances',balances:balancesObj });
});

module.exports = router;
