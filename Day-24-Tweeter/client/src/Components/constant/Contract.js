import getWeb3 from "./web3";
import Contract from '../../build/Tweeter.json';
let contractAbi= Contract.abi;

const getContract=async ()=>{
    let web3 = await getWeb3();
    let netId= await web3.eth.net.getId();
    const deployedNetwork= await Contract.networks[5777];
    let contract = await  new web3.eth.Contract(contractAbi,deployedNetwork && deployedNetwork.address);
    return contract;
}


export default getContract;



