import getWeb3 from './web3';

const getContract=async ()=>{
    let web3= await getWeb3();
    let id = await web3.eth.getId();
    let contract;
    contract = await new web3.eth.Contract();
}