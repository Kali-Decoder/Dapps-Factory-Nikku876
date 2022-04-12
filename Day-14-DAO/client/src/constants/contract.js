import DAO from '../build/DAO.json';
import web3 from './web3';

let contractDAO;
const getContract=async()=>{
    let id= await web3.eth.net.getId();
    let Address= DAO.networks[id];
    contractDAO= new web3.eth.Contract(DAO.abi,Address.address);
    return contractDAO;
}

export default getContract;
