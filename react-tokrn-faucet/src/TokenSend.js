import { ethers } from 'ethers';
import React, { useState } from 'react'
const tokenAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const TokenSend = (props) => {
    const [userAccount,setUserAccount]= useState();
    const [amount,setAmount]=useState();

    async function requestAccount(){
        await window.ethereum.request({method:'eth_requestAccounts'});

    }
    async function transferCoins(){
        if(typeof window.ethereum!=='undefined'){
            await requestAccount();
            const provider= new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract= new ethers.Contract(tokenAddress,props.tokenContract.abi,signer);
            const transaction= await contract.transfer(userAccount,amount);

            await transaction.wait();

            console.log(`${amount} Coins Successfully sent to ${userAccount}`);
        }
    }
  return (
    <div className="card p-1">
        <div className="card-header bg-primary">
            <h6 className='text-white'> <strong>Decentralised Token Faucet App :-</strong> </h6>
            
            <div className="card-body">
              <input type="text" onChange={e=>setUserAccount(e.target.value)} className="form-control mt-3" placeholder='Enter Reciever Address:-' />
              <input type="text" onChange={e=>setAmount(e.target.value)} className="form-control mt-3" placeholder='Enter Value:-' />
              <button className="btn btn-dark mt-3" onClick={transferCoins}>Send Coins</button>
            </div>
        </div>
    </div>
  )
}

export default TokenSend