
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


//FactoryB
//Contract mined! address: 0x5fde5d2ef0d7338b9c923c70674e27dc2d4e3f05 transactionHash: 0xdeca2e9709a8f305ef239b42e7c66e0d3eb4f796ed862b798f0a79fdf6d6589e
var addrFactory="0x5fde5d2ef0d7338b9c923c70674e27dc2d4e3f05";
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

