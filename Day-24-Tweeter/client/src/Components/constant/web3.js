import Web3 from "web3";

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    // if (typeof window.ethereum != "undefined") {
    //   const web3 = new Web3(window.ethereum);
    //   try {
    //     await window.ethereum.enable();
    //     resolve(web3);
    //   } catch (error) {
    //     reject(error);
    //   }
    // } else if (typeof window.web3 != "undefined") {
    //   const web3 = window.web3;

    //   console.log("Injected web3 is detected");
    //   resolve(web3);
    // }
    // else
    {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545/');
        const web3 = new Web3(provider);
        // console.log("Connexcted to local block chain ");
        resolve(web3);
    }
  });

}

export default getWeb3;
