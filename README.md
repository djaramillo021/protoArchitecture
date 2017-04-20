# protoArchitecture
Previous Requirements.
+ you need to execute a node geth (private, testnet, production)

In folder "/baseProto/data/" ,you execute 
```
npm install web3
```


The file appFactoryA.js creates factory to create smart contract "A", the ouput is the address smart contract Factory "A".

The file appFactoryB.js creates factory to create smart contract "B", the ouput is the address smart contract Factory "B".



The file appCrearA.js creates smart contract "A", It is necessary you put address smart contract Factory "A". in:

```
var addrFactory="address smart contract Factory A";
```
The ouput is an address smart contract "A".



The file appCrearB.js creates smart contract "B", It is necessary you put address smart contract Factory "B". in:
```
var addrFactory="address smart contract Factory B";
```
The ouput is an address smart contract "B".



The file appCreateValidator.js creates smart contract "Validator", the ouput is the address smart contract "Validator".



The file appFunctionValidator.js compares addresses using SHA3 and RIPEMD160.It is necessary you put address to compare in:

```
var addr_A="an address smart contract A";
var addr_B="an address smart contract B";
var addr_A1="an address smart contract A";
var addr_B1="an address smart contract B";
var addr_Validator="an address smart contract addr_Validator";
```

