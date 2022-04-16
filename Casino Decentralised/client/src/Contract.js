import {getWeb3} from "./web3.js";
import CasinoJson from "./Casino.json";
// let contractAddress = "0xe5a746d9eC6dd5e06E46f360149E2e0c21B39a64";
let web3;

const getContract = async () => {
  web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = CasinoJson.networks[networkId];
  const contract = new web3.eth.Contract(
    CasinoJson.abi,
    deployedNetwork && deployedNetwork.address
  );
  
  return contract;
};

export { getContract };

