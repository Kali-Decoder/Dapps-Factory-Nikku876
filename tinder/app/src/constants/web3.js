import Web3 from 'web3';

let web3 ;
web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545/'));

export default web3;