import React,{useState,useEffect} from 'react';
import getWeb3 from './web3';

function App() {
  const [currentAccount,setCurrentAccount]=useState(null);
  const connectWallet=async ()=>{
    try {
        const web3= await getWeb3();
        const accounts= await web3.eth.getAccounts();
        console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    connectWallet();
  },[])
  return (
    <>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-10 col-xs-10 col-10 col-sm-10 mx-auto">
            <button className="btn-primary" onClick={connectWallet}>Connect Wallet</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
