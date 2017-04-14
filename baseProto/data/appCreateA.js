
var fs = require("fs");
var Web3 = require('web3');





var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

function inicioPrograma(filename,callback){
    fs.readFile(filename, "utf8", function(err, data) {
            if (err) {
                callback(null);
            } else {  
                callback(data);
            
            }
        });

}


//FactoryA
//Contract mined! address: 0xb822e3c1fd036637505eace2841889bc6e747ab2 transactionHash: 0x2ae4b815dfe4662e5e0e38bf7e8238c83e9aa675d03ecc995a7da7511bbab0b9
var addrFactory="0xb822e3c1fd036637505eace2841889bc6e747ab2";
inicioPrograma("./contracts/A.sol",function(contractSource){


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
    var contractInstance = contracta_solContract.at(addrFactory);


var exampleEvent = contractInstance.ReturnAddress({});
exampleEvent.watch(function(err, result) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(result)
  // check that result.args._from is web3.eth.coinbase then
  // display result.args._value in the UI and call    
  exampleEvent.stopWatching()
})


    contractInstance.createObject.sendTransaction(
        {
            from: web3.eth.accounts[0], 
            data: byteCodeContract, 
            gas: '5700000'
        }
        ,function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        txhash = result;
         console.log(result);
    });






})

