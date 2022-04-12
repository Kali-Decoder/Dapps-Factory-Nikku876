import Web3 from "web3";

import SimpleStorage from "../build/contracts/SimpleStorage.json";
let web3;
let simpleStorage;

const web3init = () => {
  return new Promise((reject, resolve) => {
      //Connect to new meta mask 
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then(() => {

          resolve(new Web3(window.ethereum));
        })
        .catch((e) => {
          reject(e);
        });
      return;
    }
    //connect to old metamask
    if (window.web3) {
        
      return resolve(new Web3(window.web3.currentProvider));
    }
    // connect to ganche local block chain system 
    resolve(new Web3("HTTP://127.0.0.1:7545"));
  });
};
web3init().then((_web3)=>{
    web3=_web3;
});
const initContract = () => {
    const deploymentKey = Object.keys(SimpleStorage.networks)[0];
    console.log(deploymentKey);
    return new web3.eth.Contract(
      SimpleStorage.abi,
      SimpleStorage.networks[deploymentKey].address
    );
  };
  

// document.addEventListener('DOMContentLoaded',async ()=>{
//     web3init().then((result)=>{
//         web3=result;
//         simpleStorage = initContract();
//     }).catch((e)=>{
//         console.log(e);
//     })
// })
simpleStorage=initContract();
console.log("simple",simpleStorage);

// let accounts=[];
// const initApp=()=>{
//     web3.eth.getAccounts().then((_accounts)=>{
//         accounts=_accounts;
//         console.log(accounts);
//     }).catch(e=>console.log(e.message));
// }



// document.addEventListener("DOMContentLoaded", () => {
//   web3init()
//     .then((_web3) => {
//       web3 = _web3;
//       simpleStorage = initContract();
      
//     //   initApp();
//     })
//     .catch((e) => {
//       console.log(e.message);
//     });
//     console.log(simpleStorage);
// });
