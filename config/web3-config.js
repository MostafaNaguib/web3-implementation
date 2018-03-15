var web3 = require('web3');
web3 = new web3(new web3.providers.HttpProvider("http://localhost:4444"));
module.exports = web3;