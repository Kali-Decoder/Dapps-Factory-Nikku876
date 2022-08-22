import ContractFactory from '../build/ElectionFactory.json';

import web3 from './web3';

let contract;

const getContract = async()=>{
    let id = await web3.eth.net.getId();
    let Address= ContractFactory.networks[id];
    contract = await new web3.eth.Contract(ContractFactory.abi,Address.address);
    return contract;
}


export default getContract;
