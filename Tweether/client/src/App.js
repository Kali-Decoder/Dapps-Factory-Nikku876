import React,{useState} from 'react'
import Loader from './Components/Loader'
import getWeb3 from './Components/web3';
const App = () => {
  const [currentAccount,setCurrentAccount]=useState('');
  const getWeb=async()=>{
   const web3= await  getWeb3();
   let accounts= await web3.eth.getAccounts();
   setCurrentAccount(accounts[0]);
   console.log(accounts);
  };
  

  return (
    <div className="container-fluid">
      {/* <Loader/> */}
      <button className='btn btn-primary' onClick={getWeb} >Connect Wallet </button>
    </div>
  )
}

export default App