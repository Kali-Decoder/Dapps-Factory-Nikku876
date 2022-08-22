import Web3 from "web3";

const getWeb3 = () => {
  return new Promise(async (Resolve, Reject) => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        Resolve(web3);
      } catch (error) {
        console.log("Please install metamask ");
        Reject(error);
      }
    } else if (typeof window.web3 !== "undefined") {
      let web3 = window.web3;
      Resolve(web3);
    } else {
        
      const provider = new Web3.providers.HttpProvider("http://localhost:9545");
      const web3 = new Web3(provider);
      
      Resolve(web3);
    }
  });
};

export default getWeb3;