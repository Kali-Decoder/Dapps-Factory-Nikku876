import React, { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./artifacts/contracts/MemeCoin.sol/MemeCoin.json";
const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [supply, setSupply] = useState(0);
  const [isTokenOwner, setTokenOwner] = useState(false);
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null);
  const [yourWalletAddress, setYourWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState({
    walletAddress: "",
    burnAmount: "",
    transferAmount: "",
    mintAmount: "",
  });

  const [error, setError] = useState(null);

  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
  const contractAbi = abi.abi;

  const checkWalletIsConnected = async () => {
    // console.log("Yes");
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsWalletConnected(true);
        setYourWalletAddress(account);
        console.log("Account is connected :- ", account);
      } else {
        setError("Your Wallet Is Not Connected !!!");
        console.log("No metamask is connected ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenInfo = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokencontract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let name = await tokencontract.name();
        let symbol = await tokencontract.symbol();
        let tokenowner = await tokencontract.owner();
        let supply = await tokencontract.totalSupply();
        supply = utils.formatEther(supply);

        setName(`${name} 🤽‍♂️`);
        setSupply(supply);
        setTicker(symbol);
        setTokenOwnerAddress(tokenowner);

        if (account.toLowerCase() === tokenowner.toLowerCase()) {
          setTokenOwner(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transferTokens = async (e) => {
    e.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // console.log(signer)
        const tokencontract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const txn = await tokencontract.transfer(
          inputValue.walletAddress,
          utils.parseEther(inputValue.transferAmount)
        );
         console.log(txn); 
        console.log("Txn is Loading...");
        await txn.wait();

        console.log("Txn Hash:-", txn.hash);
        setInputValue({...inputValue,walletAddress:'',transferAmount:''});
        getTokenInfo();
      } else {
        setError("Your Wallet Is Not Connected !!!");
        console.log("No metamask is connected ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Burning Tokens
  const burningTokens = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const txnBurn = await contract.burnedTokens(
          utils.parseEther(inputValue.burnAmount)
        );
        console.log("Burning...");
        await txnBurn.wait();
        console.log("Burning Successfull.");
        let tokenSupply = await contract.totalSupply();
        tokenSupply = utils.parseEther(tokenSupply);

        setSupply(tokenSupply);
        setInputValue({...inputValue,burnAmount:''});
        getTokenInfo();
      } else {
        setError("Your Wallet Is Not Connected !!!");
        console.log("No metamask is connected ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Minting Tokens
  const mintingTokens = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        let tokenOwner = await contract.owner();
        const txnMint = await contract.mintingToknen(
          tokenOwner,
          utils.parseEther(inputValue.mintAmount)
        );
        console.log("Minting...");
        await txnMint.wait();
        console.log("Minting Successfull.:-", txnMint.hash);

        let tokenSupply = await contract.totalSupply();
        tokenSupply = utils.parseEther(tokenSupply);

        setSupply(tokenSupply);
        setInputValue({...inputValue,mintAmount:''})
        getTokenInfo();
      } else {
        setError("Your Wallet Is Not Connected !!!");
        console.log("No metamask is connected ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputValue({ ...inputValue, [name]: value });
  };
  useEffect(() => {
    checkWalletIsConnected();
    getTokenInfo();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4 mx-auto">
        <div className="col-md-10 col-10 col-xs-10 mx-auto outer">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">
                <strong>Meme Coin Project 🪙</strong>
              </h3>
              {error && <p className="text-danger">Error Detected : {error}</p>}
              <div className="d-flex justify-content-between mt-4">
                <h6>Coin :- <code className="text-danger">{name}</code></h6>
                <h6>Ticker :- <code className="text-danger">{ticker}</code></h6>
                <h6>Total Supply :- <code className="text-danger">{supply}</code> </h6>
              </div>
              <input
                type="text"
                placeholder="Wallet Address 0x"
                className="form-control mt-5"
                onChange={handleInputChange}
                value={inputValue.walletAddress}
                name="walletAddress"
              />
              <input
                type="text"
                placeholder={`0.0000 ${ticker}`}
                className="form-control mt-3"
                value={inputValue.transferAmount}
                onChange={handleInputChange}
                name="transferAmount"
              />
              <button className="btn-success btn mt-3" onClick={transferTokens}>
                Transfer Tokens
              </button>
            </div>
            {isTokenOwner && ( 
              <>
              <div className="card-header mt-3">
                <h4 className="text-center">Burn Tokens 🔥</h4>
                <input
                type="text"
                placeholder={`0.0000 ${ticker}`}
                className="form-control mt-3"
                value={inputValue.burnAmount}
                onChange={handleInputChange}
                name="burnAmount"
              />
              <button className="btn-success btn mt-3" onClick={burningTokens}>
                Burn Tokens
              </button>
              </div>
              <div className="card-header mt-3">
                <h4 className="text-center">Mint Tokens 🔥</h4>
                <input
                type="text"
                placeholder={`0.0000 ${ticker}`}
                className="form-control mt-3"
                value={inputValue.mintAmount}
                onChange={handleInputChange}
                name="mintAmount"
              />
              <button className="btn-success btn mt-3" onClick={mintingTokens}>
                Mint Tokens
              </button>
              </div>
              </>
            )}
            <div className="card-body">
              <div className="mt-5">
                <p><span className="font-bold">Contract Address: </span>{contractAddress}</p>
                </div>
                <div className="mt-5">
                  <p><span className="font-bold">Token Owner Address: </span>{tokenOwnerAddress}</p>
                </div>
                <div className="mt-5">
                  {isWalletConnected && <p><span className="font-bold">Your Wallet Address: </span>{yourWalletAddress}</p>}
                  <button className="btn btn-danger" onClick={checkWalletIsConnected}>
                    {isWalletConnected ? "Wallet Connected 🔒" : "Connect Wallet 🔑"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
