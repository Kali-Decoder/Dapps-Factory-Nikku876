import getWeb3 from "./web3";
import Domain from '../contracts/Domains.json';

const getContract=async ()=>{
    let contract;
    let web3= await getWeb3();
    let id = await web3.eth.getId();
    let address= Domain.networks[id].address;
    contract = await new web3.eth.Contract(Domain.abi,address);
    return contract;
}

export default getContract;