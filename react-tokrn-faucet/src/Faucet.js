import React,{useState} from 'react'
import { ethers } from 'ethers'
import Message from './Message';
const tokenAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const Faucet = (props) => {
  
  const [balance,setBalance]= useState();
  const [showBalance,setShowBalance]=useState();
  async function getBalance(){
    if(typeof window.ethereum !== 'undefined'){
      const [account]= await window.ethereum.request({method:'eth_requestAccounts'});
  
      const provider= new ethers.providers.Web3Provider(window.ethereum);
      const contract= new ethers.Contract(tokenAddress,props.tokenContract.abi,provider);

      const balance= await contract.balanceOf(account);
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }
  async function faucet(){
    if(typeof window.ethereum !== 'undefined'){
      const [account]= await window.ethereum.request({method:'eth_requestAccounts'});
      const provider= new ethers.providers.Web3Provider(window.ethereum);
      const signer= provider.getSigner();
      const contract= new ethers.Contract(tokenAddress,props.tokenContract.abi,signer);

      contract.faucet(account,100);
      getBalance();
    }
  }

  return (
    <div className="card p-1">
        <div className="card-header bg-primary">
            <h6 className='text-white'> <strong>Decentralised Token Faucet App :-</strong> </h6>
            {showBalance? <Message balance={balance} />:null}
            <div className="card-body">
              <button className="btn btn-dark mt-3" onClick={faucet}>Get Faucet Token</button>
              <button className="btn btn-dark mt-3" onClick={getBalance}>Check My Balance</button>
            </div>
        </div>
    </div>
  )
}

export default Faucet;