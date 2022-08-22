import { ethers } from "ethers";
import React, { createContext, useState, useEffect } from "react";
import { contractAddress, abi } from "./constant";

export const WalletContext = createContext();
let eth;
if (typeof window.ethereum !== "undefined") {
  eth = window.ethereum;
}
const getContract = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(eth);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const WalletContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: "",
    amount: "",
  });
  const [balance, setBalance] = useState("");
  const [latestTx, setLatestTx] = useState("#");

  const onchangeData = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!eth) {
        return alert("Meta mask is not ");
      }
      const accounts = await eth.request({ method: "eth_accounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!eth) {
        return alert("Please install metamask !!!");
      }
      const accounts = await eth.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendEther = async () => {
    try {
      if (!eth) {
        return alert("Please Connect Metamask");
      }
      const { to, amount } = formData;
      const ethContract = await getContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      const tx = await eth.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: to,
            gas: "0x7EF40", // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      });

      const txHash = await ethContract.sendEther(to, parsedAmount);
      setIsLoading(true);

      await txHash.wait();

      console.log("Transaction Is Complete :", txHash);
      setLatestTx(`https://ropsten.etherscan.io/tx/${txHash.hash}`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        isLoading,
        currentAccount,
        onchangeData,
        sendEther,
        latestTx,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
