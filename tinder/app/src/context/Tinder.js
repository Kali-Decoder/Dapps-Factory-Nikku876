import React, { createContext, useEffect, useState } from "react";
import getContract from "../constants/contract";
import web3 from "../constants/web3";
export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentWalletAddress, setCurrentWalletAddress] = useState(undefined);
  const [swipeLoader,setSwipeLoader]= useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    gender: "",
    url: "",
  });
  const [dataLoader,setDataLoader]=useState(false);
  const [matchableData,setMatchableData]=useState([]);

  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const onClick = async (e) => {
    e.preventDefault();
    setPostLoader(true);
    if (currentWalletAddress) {
      let { name, age, city, gender, url } = formData;
      age = +age;
      gender = gender == "0" ? 0 : 1;
      try {
        let contract = await getContract();
        // console.log(typeof name,typeof city,typeof age,typeof gender,typeof url);
        const tx = await contract.methods
          .register(name, city, gender, age, url)
          .send({ from: currentWalletAddress, gas: "20000000" });
        console.log("You are register ");
        setFormData({ name: "", age: "", city: "", gender: "", url: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please Connect Your Wallet");
    }
    setPostLoader(false);
    
  };

  
  const getDetails = async () => {
    let x = await web3.eth.getAccounts();
    setAccounts(x);
    // setCurrentWalletAddress(accounts[0]);
  };


  const getMatchableAccounts = async (_city)=>{
   
      try {
        let contract = await getContract();
        let data = await contract.methods.getMatchableUsers(_city).call();
        
        console.log(data)
        // setMatchableData(data)

      } catch (error) {
        console.log(error);
      }
  }

  const swipe=async(swipeStatus,address)=>{
    setSwipeLoader(true);
    try {
      
      let contract = await getContract();
      const tx= await contract.methods.swipe(swipeStatus,address).send({from:currentWalletAddress,gas:'1000000'})
      

    } catch (error) {
      console.log(error)
    }
    setSwipeLoader(false)
  }
  useEffect(() => {
    getDetails();
    // getMatchableAccounts("delhi");
  }, []);

  return (
    <TinderContext.Provider
      value={{
        accounts,
        currentWalletAddress,
        getDetails,
        onChange,
        formData,
        onClick,
        postLoader,
        swipe,
        swipeLoader,
        matchableData,
        getMatchableAccounts,
        setCurrentWalletAddress
      }}
    >
      {children}
    </TinderContext.Provider>
  );
};
