import EtherWallet from '../build/contracts/EtherWallet.json';
// console.log(EtherWallet);
import Web3 from 'web3';

let web3;
let etherWallet;

const web3Init=async ()=>{
    
    return new Promise((resolve,reject)=>{
        // case 1
        if(typeof window.ethereum!=='undefined'){
            const web3= new Web3(window.ethereum);
            window.ethereum.enable().then(()=>{
                    resolve(new Web3(window.ethereum));
            }).catch((e)=>{
                reject(e);
            })
        }
        // case2 
        if(typeof window.web3 !=='undefined'){
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        //Connect to ganache case3
        resolve(new Web3('HTTP://127.0.0.1:7545'));
    })
}
const contractInit=async ()=>{
    const netId= await web3.eth.net.getId();
    // console.log(EtherWallet.networks[netId].address);
    return new web3.eth.Contract(EtherWallet.abi,EtherWallet.networks[netId].address);
}

const appInit=async ()=>{
    const balance= document.querySelector(".balanace");
    const send=document.querySelector(".send")
    const value= document.querySelector(".value");
    const to =document.querySelector(".to");
    const alertMsg=document.querySelector(".alertMsg")
    let accounts=[];
    web3.eth.getAccounts().then((_accounts)=>{
        // console.log(_accounts);
        accounts=_accounts;
        console.log(accounts);
    })
    const refreshBalance = () => {
        etherWallet.methods
          .balanceOf()
          .call()
          .then(result => {
            balance.innerHTML = result+' Eth';
          });
      };
    refreshBalance();

    send.addEventListener('click',()=>{
        const address= to.value;
        const amount= value.value;
        etherWallet.methods.sendEther(address,amount).send({from:accounts[0]}).then((result)=>{
            alertMsg.innerHTML = `Sent ${amount} wei to ${to}`;
            refreshBalance();
        }).catch((e)=>{
            alertMsg.innerHTML = `Ooops... there was an error while trying to send ether from the contract...`;
        })
    })
}


document.addEventListener('DOMContentLoaded',async ()=>{
    web3Init().then((_web3)=>{
        web3=_web3;
        return contractInit();
    }).then((result)=>{
        etherWallet=result;
        console.log(etherWallet);
        appInit();
    }).catch((e)=>{
        console.log('Your Meta Mask Is Not Connected');
    })
})