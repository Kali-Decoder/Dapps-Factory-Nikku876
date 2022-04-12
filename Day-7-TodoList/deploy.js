const HDWallet= require('@truffle/hdwallet-provider');
const {interface,bytecode}= require('./compile');
const provider= new HDWallet('divide soccer claim swift opinion letter opinion tail nose burst tissue shock','https://ropsten.infura.io/v3/00b91fcc1dc44ced900f68b91f76d00a');

const Web3= require('web3');
const web3= new Web3(provider);

const deploy= async ()=>{
    const accounts = await web3.eth.getAccounts();
    const  contract= await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode}).send({from:accounts[0],gas:'1000000'});

    console.log("Contract Address :- ",contract.options.address);
    console.log("Account Address:- ",accounts[0]);
    console.log(interface);
}

deploy();