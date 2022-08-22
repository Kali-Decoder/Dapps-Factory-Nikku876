import React, { useContext } from "react";
import Loader from "./utils/Loader";
import { WalletContext } from "./utils/WalletCotext";
const App = () => {
  const {connectWallet,isLoading,currentAccount,onchangeData,sendEther,latestTx}= useContext(WalletContext);
  // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12 col-12 col-xs-12 mx-auto d-flex justify-content-end">
          <button
            className="button"
            style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
            onClick={connectWallet}
          >
            <i className="fa-brands fa-ethereum  fa-2x"></i>
          </button>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-md-6 col-6 mx-auto">
            {currentAccount ? <code className="text-center text-danger">Current Account Connected :- <span className="text-success">{currentAccount}</span></code>:<code className="text-center text-danger">"No Meta Mask Is Connected"</code> }
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 col-11 col-xs-6 col-sm-6 mx-auto">
          <input
            type="text"
            placeholder=" Receiver Address :-"
            className="mt-2"
            name="to"
            onChange={(e)=>onchangeData(e,e.target.name)}
          />
          <br />
          <input
            type="number"
            step="0.1"
            placeholder="Amount (Eth):-"
            className="mt-2"
            name="amount"
            onChange={(e)=>onchangeData(e,e.target.name)}
          />
          <div className="col-md-6 col-6 col-xs-6 mx-auto mt-5">
            <button className="button" onClick={sendEther}>
              Send Ether From Wallet
              <i className="fa-brands fa-ethereum mx-2"></i>
            </button>
          </div>
        </div>
      </div>
      {isLoading ? <Loader/>: 
        <div className="row mt-5">
          <div className="col-md-6 col-6 mx-auto">
            <code className="text-success"><a href={latestTx} target="_blank">Here You Can Check Transaction</a></code>
          </div>
        </div>
        }
    </div>
  );
};

export default App;
