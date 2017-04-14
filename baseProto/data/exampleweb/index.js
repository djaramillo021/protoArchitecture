


<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/lib-typedarrays.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/x64-core.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/sha3.js"></script>   
       

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/ripemd160.js"></script>   
       



<script>
    var hashSha3 = CryptoJS.SHA3("Message");
 var hashRipemd160 = CryptoJS.RIPEMD160("Message");



    alert(hashSha3);
    alert(hashRipemd160);
</script>