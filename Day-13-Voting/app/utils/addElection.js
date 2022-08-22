import getContract from "./Contract";
import web3 from "./web3";
import Election from "../build/Election.json";

let electionContract;

const createElection = async (_email, _name, _desc) => {
  let accounts = await web3.eth.getAccounts();
  let contract = await getContract();
  try {
    let tx = await contract.methods
      .createElection(_email, _name, _desc)
      .send({ from: accounts[0] ,gas:'1000000'});
      console.log(tx)
    // return { message: "Yes Deployed", isError: false };
  } catch (error) {
    console.log(error)
    // return { message: "Not Deployed", isError: true };
  }
};

 const getDeployedElection = async (_email) => {
  try {
    let accounts = await web3.eth.getAccounts();
    let contract = await getContract();
    let data = await contract.methods.getDeployedElection(_email).call();
    
    return { message: data, isError: false };
  } catch (error) {
    console.log(error)
    return { message: "Not Deployed", isError: true };
  }
};

export default getDeployedElection;
