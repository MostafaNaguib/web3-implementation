var express = require('express');
var web3 = require('../config/web3-config');
var solc = require('solc');
var router = express.Router();

/* GET Contracts. */
router.get('/', function(req, res, next) {
  var coinbase = web3.eth.coinbase;
  console.log(web3.eth.getBalance(coinbase).toNumber());

  res.render('index', { title: 'Compile Contract' });
});

/* GET Compile Contracts. */
router.get('/compile', function(req, res, next) {
  res.render('contracts/compile', { title: 'Compile contract' });
});


/* POST Compile Contracts. */
router.all('/deploy', function(req, res, next) {
    //Get Accounts for select Box
    var accounts = web3.personal.listAccounts;
    var contract = req.body.contract;
    var output = solc.compile(contract, 1);
    var contractsObj = [];
    for (var contractName in output.contracts) {
        contractsObj['bytes'] = output.contracts[contractName].bytecode;
        contractsObj['abi'] = output.contracts[contractName].interface;
    }
    // console.log(contractsObj);
    res.render('contracts/compiled', {title: 'Compiled contract',contracts:contractsObj,accounts:accounts});
});


/*POST Deploy Contracts. */
router.post('/deployed', function(req, res, next) {
    var abi = JSON.parse(req.body.abi);
    var bin = '0x' + req.body.bytes;
    var account = req.body.account;
    var password = req.body.password;
    var contractObj  = web3.eth.contract(abi);
    try {
        //Unlock Account
        web3.personal.unlockAccount(account,password);
        tx = contractObj.new({'from': account, 'gas': 410000,data:bin});
        // console.log(tx.transactionHash);
    } catch (e){
        var msg = e;
        var tx = '';
        // console.log(tx.transactionHash);
    }

    res.render('contracts/deploy', {title: 'Deploy contract',tx:tx,msg:msg});
});

module.exports = router;
