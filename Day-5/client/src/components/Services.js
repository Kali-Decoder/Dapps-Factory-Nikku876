import React,{useContext} from "react";
import  TransactionContext  from "./ContextTransaction";
import Transaction from "./Transaction";
import Loading from "./Loading";
const Services = () => {
  const { currentAccount, connectWallet, isLoading,transactions } = useContext(TransactionContext);
    
  return (
    <>
      <div className="container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="row mt-5">
          <div className="col-md-6 col-11 col-xs-6 col-sm-6 mx-auto ">
            <h2>
              <strong>Buy And Sell Trusted Crypto $ Tokens</strong>
              {transactions.length}
            </h2>
            <br />
            <p className="text-capitalize">
              <strong>
                Explore The Crypto world . buy and sell crypto coins easily .
                <br />
                Trusted Cryptoon to be your crypto market.
              </strong>
            </p>
            <br />
            {currentAccount?<button className="button" >
              <i className="fa-solid fa-lock mx-2"></i>Wallet Connected Successfully 
            </button>:<button className="button" onClick={connectWallet} >
              <i className="fa-solid fa-lock mx-2"></i>Connect Wallet
            </button>}

            <div className="main mt-4">
              <div className="row">
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>Binanace</h6>
                </div>
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>CoinMarketCap</h6>
                </div>
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>Blockchain</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>Ethereum</h6>
                </div>
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>Solidity</h6>
                </div>
                <div className="col-md-4 col-4 mx-auto content">
                  <h6>IPFS</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-11 col-xs-6 col-sm-6 mx-auto ">
                <Transaction />
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
