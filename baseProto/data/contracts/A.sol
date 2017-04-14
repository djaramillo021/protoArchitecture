pragma solidity ^0.4.2;

contract A {

     address d;

}

contract ObjectFactory {
    event ReturnAddress(address indexed _address);
    function createObject() returns (address ) {
        address objectAddress= (new  A ());
        ReturnAddress(objectAddress);
        return objectAddress;
       
    }
}