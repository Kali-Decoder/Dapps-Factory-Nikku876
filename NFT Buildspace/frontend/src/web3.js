import { Web3 } from "web3";

const getWeb3 = () => {
  return new Promise(async (Resolve, Reject) => {
    if (typeof window.ethereum != "undefined") {
        // Connected to old metamask 
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        Resolve(web3);
      } catch (error) {
        console.log("Meta mask is not connected ...");
        Reject(error);
      }
    }
    // Coneected to new meta mask 
   else if(typeof window.web3 != 'undefined' ){
       const web3= window.web3;
       try {
           Resolve(web3);
       } catch (error) {
           Reject(error);
       }
   }
   //connected to local blockchain  by giving htttp provider 
   else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:9545/"
    );
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    Resolve(web3);
  }
  });
};
export default getWeb3;