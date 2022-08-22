import getWeb3 from './web3';
import Courses from '../contracts/ResourcePlatform.json'
const getContract=async ()=>{
    let web3= await getWeb3();
    // let id = await web3.eth.getId();
    let contractAddress= Courses.networks[5777].address;
    // console.log(contractAddress,id);
    let contract;
    contract = await new web3.eth.Contract(Courses.abi,contractAddress);
    
    return contract;
}

export default getContract;