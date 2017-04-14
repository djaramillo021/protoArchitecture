
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





inicioPrograma("./contracts/B.sol",function(contractSource){


    if(contractSource==null)
    {
        return;
    }
    var contractCompiled =  web3.eth.compile.solidity(contractSource);

var abiDefinitionContract;
var byteCodeContract;
  for (var contractName in contractCompiled) {
        if(contractName.indexOf("ObjectFactory")>0)
        {
            abiDefinitionContract=contractCompiled[contractName].info.abiDefinition;
            byteCodeContract=contractCompiled[contractName].code;
            //console.log(contractName);
            break;
        }
        //break;
    }

var contracta_solContract = web3.eth.contract(abiDefinitionContract);


   // var contracta_sol_aContract = web3.eth.contract([]);
    var contracta_sol = contracta_solContract.new(
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

