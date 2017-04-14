
var fs = require("fs");
var Web3 = require('web3');





var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


/*
var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

*/

function inicioPrograma(filename,callback){
    fs.readFile(filename, "utf8", function(err, data) {
            if (err) {
                callback(null);
            } else {  
                callback(data);
            
            }
        });

}



//A
//_address: '0x599d4e787300e73d9e93ea3c83ba5408175ee0fc'

//B
//_address: '0x971adca3fc135afdd542a3f1fc1c569593c009c8'

//A_1
//_address: '0x9269a2ab1202070336566d365b334adaf097156b'

//B_1
//_address: '0xae7333230e09fcbc8ec384a71ed4b989fa307320'

//Validate
//Contract mined! address: 0x9ca301f8b57189989ebea89bb88ef70f222475f2 transactionHash: 0x4f5caa0b85289d4ed983b1aa8b161010e0e24dd59f8c82d6c284f00adfea1432

var addr_A="0x599d4e787300e73d9e93ea3c83ba5408175ee0fc";
var addr_B="0x971adca3fc135afdd542a3f1fc1c569593c009c8";

var addrBase=addr_A;

inicioPrograma("./contracts/Validation.sol",function(contractSource){


    if(contractSource==null)
    {
        return;
    }
    var contractCompiled =  web3.eth.compile.solidity(contractSource);

var abiDefinitionContract;
var byteCodeContract;
for (var contractName in contractCompiled) {
    abiDefinitionContract=contractCompiled[contractName].info.abiDefinition;
    byteCodeContract=contractCompiled[contractName].code;
    break;
}

var contracta_solContract = web3.eth.contract(abiDefinitionContract);


   // var contracta_sol_aContract = web3.eth.contract([]);
    var contracta_sol = contracta_solContract.new(
    addrBase,
    {
        from: web3.eth.accounts[0], 
        data: byteCodeContract, 
        gas: '5700000'
    }, function (e, contract){
        if(e)
        {
            
            console.error(e);
            
            return;
        }
        
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
    })



})

