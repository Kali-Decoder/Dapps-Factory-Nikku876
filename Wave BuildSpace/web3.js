const { resolve } = require("path");
const Web3 = require("web3");

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    if (typeof window.ethereum !='undefined') {
      const web3 = new Web3(window.ethereum);
      try {
        await ethereum.enable();
        resolve(web3);
      } catch (error) {
        console.log("Meta mask is not connected ");
        console.log(error);
        reject(error);
      }
    }
    else if (typeof window.web3 !='undefined'){
        const web3=window.web3;
        resolve(web3);

    }

    const provider= new Web3.providers.HttpProvider();
    const web3= new Web3(provider);
    resolve(web3);
  });
};


export default getWeb3();