
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



//A
//_address: '0x599d4e787300e73d9e93ea3c83ba5408175ee0fc'

//B
//_address: '0x971adca3fc135afdd542a3f1fc1c569593c009c8'

//A_1
//_address: '0x9269a2ab1202070336566d365b334adaf097156b'

//B_1
//_address: '0xae7333230e09fcbc8ec384a71ed4b989fa307320'

//Validate
//Contract mined! address: 0x5a3caf10ea1b286bbc6bb3ae2ef7b18e630fcdc3 transactionHash: 0x01b07a837d5f2afbf67690a24d9eb4ac947b6c46b9d20225c9620e4fd8287a2d


var addr_A="0x599d4e787300e73d9e93ea3c83ba5408175ee0fc";
var addr_B="0x971adca3fc135afdd542a3f1fc1c569593c009c8";
var addr_A1="0x9269a2ab1202070336566d365b334adaf097156b";
var addr_B1="0xae7333230e09fcbc8ec384a71ed4b989fa307320";
var addr_Validator="0x5a3caf10ea1b286bbc6bb3ae2ef7b18e630fcdc3";


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

var contractInstance = contracta_solContract.at(addr_Validator);



// call constant function
var getCodeInfoA = contractInstance.getCodeInfo(addr_A);
console.log("getCodeInfo addr_A")
console.log(addr_A)
console.log(getCodeInfoA) // '0x25434534534'

// call constant function
var getCodeInfoB = contractInstance.getCodeInfo(addr_B);
console.log("getCodeInfo addr_B")
console.log(addr_B)
console.log(getCodeInfoB) // '0x25434534534'






// call constant function
var getData = contractInstance.getData();
console.log("getData")
console.log(getData) // '0x25434534534'




// call constant function
var compareA = contractInstance.compare(addr_A);
console.log("compare addr_A")
console.log(addr_A)
console.log(compareA) // '0x25434534534'

// call constant function
var compareA1 = contractInstance.compare(addr_A1);
console.log("compare addr_A1")
console.log(addr_A1)
console.log(compareA1) // '0x25434534534'



// call constant function
var compareB = contractInstance.compare(addr_B);
console.log("compare addr_B")
console.log(addr_B)
console.log(compareB) // '0x25434534534'




})

