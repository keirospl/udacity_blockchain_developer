/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration 
var Web3 = require("web3");
var EthereumTransaction = require("ethereumjs-tx");
var web3 = new Web3('HTTP://127.0.0.1:7545');

// -- Step 2: Set the sending and receiving addresses for the transaction. 
var sendingAddress = '0xa8885Ea75aB7B2d318E9cA6d5Af368eeC9Bf8843';
var receivingAddress = '0x49e94d7288D70CB99e31DB91DB75Ebbd2588CD14';

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
var rawTransaction = { 
    nonce: 0, 
    to: receivingAddress, 
    gasPrice: 20000000, 
    gasLimit: 30000, 
    value: 1, 
    data: "0x0" 
}

// -- Step 5: View the raw transaction
rawTransaction;

// -- Step 6: Check the new account balances (they should be the same) 
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = '7566f92641a4f614aea6cbf112233bd5aa21bf9d24aa4f6bf13befa3d2192f71';
var privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
var transaction = new EthereumTransaction.Transaction(rawTransaction);
transaction.sign(privateKeySenderHex);

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);