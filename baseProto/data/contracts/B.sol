pragma solidity ^0.4.2;

contract B {

      uint d;

}

contract ObjectFactory {
    event ReturnAddress(address indexed _address);
    function createObject() returns (address ) {
        address objectAddress= (new  B ());
        ReturnAddress(objectAddress);
        return objectAddress;
       
    }
}