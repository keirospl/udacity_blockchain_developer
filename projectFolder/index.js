/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration 
var Web3 = require("web3");
var EthereumTransaction = require("ethereumjs-tx");
var web3 = new Web3('HTTP://127.0.0.1:7545');

// -- Step 2: Set the sending and receiving addresses for the transaction. 
var addressFrom = '0xa8885Ea75aB7B2d318E9cA6d5Af368eeC9Bf8843';
var addressTo = '0x49e94d7288D70CB99e31DB91DB75Ebbd2588CD14';

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(addressFrom).then(console.log);
web3.eth.getBalance(addressTo).then(console.log);

var privKey = '7566f92641a4f614aea6cbf112233bd5aa21bf9d24aa4f6bf13befa3d2192f71';

// Create transaction
const deploy = async () => {
    console.log(
       `Attempting to make transaction from ${addressFrom} to ${addressTo}`
    );
 
    const createTransaction = await web3.eth.accounts.signTransaction(
       {
          from: addressFrom,
          to: addressTo,
          value: web3.utils.toWei('1', 'ether'),
          gas: '21000',
       },
       privKey
    );
    // Deploy transaction
   const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
 );
 console.log(
    `Transaction successful with hash: ${createReceipt.transactionHash}`
 );
};

deploy();