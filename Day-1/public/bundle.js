var contractABI=[
    {
      "inputs": [],
      "name": "helloWorld",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ];
var contractAddress= '0x9314B89fA5d29E0E1e4BCDe0c768Fa1a65fc5A5F';
var web3= new Web3('HTTP://127.0.0.1:7545');
console.log(web3);

var simplesmartContract= new web3.eth.Contract(contractABI,contractAddress);
web3.eth.getAccounts().then(console.log);

document.addEventListener('DOMContentLoaded',()=>{
    simplesmartContract.methods.helloWorld().call().then((result)=>{
        document.querySelector(".hello").innerHTML=result
    });
});