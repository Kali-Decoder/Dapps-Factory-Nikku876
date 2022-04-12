import React, { createContext, useState, useEffect } from "react";
import MarketContract from "./market";
import web3 from "./web3";
export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      image: "",
      description: "",
      location: "",
      price: 0,
    });

  const connectWallet = async () => {
    try {
      setIsConnected(true);
      let accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      console.log(accounts[0]);
      setIsConnected(false);
    } catch (error) {
      console.log(error);
    }
  };

    const registerProduct = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };

    const getProduct = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };

    const totalNumberOfProducts=async()=>{

    }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <MarketContext.Provider value={{ connectWallet, isConnected }}>
      {children}
    </MarketContext.Provider>
  );
};
