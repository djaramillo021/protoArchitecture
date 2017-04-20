pragma solidity ^0.4.2;
contract Validation{

    bytes32 private sha3Base;
    bytes20 private ripemd160Base;
    

    function getCode(address _addr) constant returns (bytes o_code,uint o_code_size) {
        assembly {
            // retrieve the size of the code, this needs assembly
            let size := extcodesize(_addr)
            o_code_size := size
            // allocate output byte array - this could also be done without assembly
            // by using o_code = new bytes(size)
            o_code := mload(0x40)
            // new "memory end" including padding
            mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // store length in memory
            mstore(o_code, size)
            // actually retrieve the code, this needs assembly
            extcodecopy(_addr, add(o_code, 0x20), 0, size)
        }
    }

    function Validation(address addrBase)
    {
        var (xCode, bLength)=getCode(addrBase);
        if(bLength<=0)
        {
            revert();
        }
       sha3Base= sha3(xCode); //returns (bytes32)
       ripemd160Base=ripemd160(xCode);// returns (bytes20):
    }




    function getCodeInfo( address _addrVerif) constant returns (uint code,bytes32 sha3Verf,bytes20 ripemd160Verf)
    {
        //compare
         var (xCodeVerf, bLengthVerf)=getCode(_addrVerif);
         if(bLengthVerf<=0)
         {
             code= 404;
             return;
         }
         
         sha3Verf= sha3(xCodeVerf); //returns (bytes32)
         ripemd160Verf=ripemd160(xCodeVerf);// returns (bytes20):
          code= 200;

    }


    function compare( address _addrVerif) constant returns (uint code,bytes32 sha3Verf,bytes20 ripemd160Verf)
    {
        //compare
         var (xCodeVerf, bLengthVerf)=getCode(_addrVerif);
         if(bLengthVerf<=0)
         {
             code= 404;
             return;
         }
         
         sha3Verf= sha3(xCodeVerf); //returns (bytes32)
         ripemd160Verf=ripemd160(xCodeVerf);// returns (bytes20):
         if(sha3Base!=sha3Verf)
         {
             code= 501;
             return;
         }
         if(ripemd160Base!=ripemd160Verf)
         {
             code= 502;
             return;
         }
          code= 200;


    }



    function getData() constant returns (bytes32 ,bytes20)
    {


        return (sha3Base, ripemd160Base);

    }




    
    



}
