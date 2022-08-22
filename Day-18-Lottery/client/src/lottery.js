import web3 from './web3';
const abi =[{"constant":true,"inputs":[],"name":"returnArray","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

const addressContract= '0xe2cD5c2523f7ffb81d6FFFc4D803757F400cedE9';
const owner= '0x44c71DA900A47Fd1088c40a4a141f41d1f2b683D';


const lottery=new web3.eth.Contract(abi,addressContract);
export default lottery;