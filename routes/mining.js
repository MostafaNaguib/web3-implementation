var express = require('express');
var web3 = require('../config/web3-config');
var router = express.Router();

/* GET mining home page. */
router.get('/', function(req, res, next) {
    var accounts = web3.personal.listAccounts;
    res.render('mining/mine', { title: 'Start Mining',accounts:accounts });
});


router.post('/start', function(req, res, next) {
    var core = parseInt(req.body.cores);
    var sleep = parseInt(req.body.sleep);
    var account = req.body.account;
    web3.miner.setEtherbase(account);
    var BlocksBefore = web3.eth.blockNumber;
    web3.miner.start(core);
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + sleep) {
        ;
    }
    web3.miner.stop();
    var BlocksAfter = web3.eth.blockNumber;

    res.render('mining/mining', { title: 'Mining',before:BlocksBefore,after:BlocksAfter });
});

router.get('/stop', function(req, res, next) {
    var BlocksBefore = web3.eth.blockNumber;
    web3.miner.stop();
    var BlocksAfter = web3.eth.blockNumber;
    res.render('mining/mining', { title: 'Stop Mining',before:BlocksBefore,after:BlocksAfter});
});

module.exports = router;
