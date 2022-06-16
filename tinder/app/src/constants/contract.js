import DTinder from '../DTinder.json';
import getWeb3 from './web3';

let contractTinder;
const getContract=async()=>{
    let id= await web3.eth.net.getId();
    
    let Address= DTinder.networks[id];
    let web3= await getWeb3();
    contractTinder= new web3.eth.Contract(DTinder.abi,Address.address);
    return contractTinder;
}

export default getContract;
