import Web3 from 'web3';
let web3;

let provider= new Web3.providers.HttpProvider('http://127.0.0.1:9545/');
web3 = new Web3(provider);

export default web3;