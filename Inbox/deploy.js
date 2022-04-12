const HDWallet= require('@truffle/hdwallet-provider');
const Web3= require('web3');
const {interface,bytecode} = require('./compile');
const provider= new HDWallet(
    //nmemmoic,
    //infura project url of any test network
);

const web3= new Web3(provider);

const deploy= async()=>{

    const accounts= await web3.eth.getAccounts();
    console.log("Owner Address :- ",accounts[0]);
    const result= await new web3.eth.Contract(interface).deploy({data:bytecode,arguments:['Hello World']}).send({from:accounts[0],gas:'1000000'});
    console.log("Contract  Address :- ",result.options.address);
}
deploy();