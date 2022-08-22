const HDWallet= require('@truffle/hdwallet-provider');
const Web3=require('web3');
const compiledFactory= require('./build/CampaignFactory.json');

const provider= new HDWallet('divide soccer claim swift opinion letter opinion tail nose burst tissue shock','https://ropsten.infura.io/v3/00b91fcc1dc44ced900f68b91f76d00a');

const web3= new Web3(provider);

const  deploy=async ()=>{
    const accounts= await web3.eth.getAccounts();
    const contract = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data:compiledFactory.bytecode}).send({from:accounts[0],gas:'1000000'});

    console.log("Address of Contract :- ",contract.options.address);
    console.log("Address of Owner :- ",accounts[0]);
    
}

deploy();
