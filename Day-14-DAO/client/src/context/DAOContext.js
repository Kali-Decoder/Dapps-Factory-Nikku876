import React, { createContext, useEffect, useState } from "react";
import getContract from "../constants/contract";
import web3 from "../constants/web3";
export const DAOContext = createContext();

export const DAOProvider = ({ children }) => {
  const [admin, setAdmin] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [remainingShare, setRemainingShare] = useState(undefined);
  const [totalShare, setTotalShare] = useState(undefined);
  const [dataLoader, setDataLoader] = useState(false);
  const [proposalData, setProposalData] = useState({
    name: "",
    to: "",
    amount: 0,
  });
  const [contribute, setContribute] = useState({
    amount: 0,
    account: "",
  });
  const [proposalLoader, setProposalLoader] = useState(false);
  const [proposalList, setproposalList] = useState(undefined);
  const [contributeLoader, setContributeLoader] = useState(false);

  const proposalChange = (e, name) => {
    let value = e.target.value;
    setProposalData({ ...proposalData, [name]: value });
  };
  const contributeChange = (e, name) => {
    let value = e.target.value;
    setContribute({ ...contribute, [name]: value });
  };

  const getList = async () => {
    try {
      let contract = await getContract();
      let total = await contract.methods.nextId().call();

      let newArray = [];
      for (let i = 0; i < total; i++) {
        let array = await contract.methods.proposals(i).call();
        const item = {
          id:array[0],
          name:array[1],
          amount:array[2],
          to:array[3],
          votes:array[4],
          end:array[5],
          executed:array[6],
        };
        newArray.push(item);
      }

      setproposalList(newArray);
    } catch (error) {
      console.log(error);
    }
  };
  const createProposal = async (e) => {
    e.preventDefault();
    try {
      setProposalLoader(true);
      let contract = await getContract();
      let accounts = await web3.eth.getAccounts();
      await contract.methods
        .createProposal(proposalData.name, proposalData.amount, proposalData.to)
        .send({ from: accounts[2], gas: "1000000" });

      setProposalLoader(false);
    } catch (error) {
      console.log(error);
      setProposalLoader(false);
    }
  };
  const contributeShare = async (e) => {
    e.preventDefault();
    try {
      if (contribute.account && contribute.amount) {
        setContributeLoader(true);
        let accounts = await web3.eth.getAccounts();
        let contract = await getContract();
        const tx = await contract.methods.contribute().send({
          from: contribute.account,
          value: contribute.amount,
          gas: "1000000",
        });
        console.log(tx);
        getData();
        setContributeLoader(false);
      } else {
        console.log("Please Enter Valid Details");
      }
    } catch (error) {
      console.log(error);
      setContributeLoader(false);
    }
  };
  const getData = async () => {
    try {
      setDataLoader(true);

      let contract = await getContract();
      let admin = await contract.methods.manager().call();
      let endTime = await contract.methods.contributionEnd().call();
      let remainingShare = await contract.methods.remainingShares().call();
      let totalShares = await contract.methods.totalShares().call();
      setAdmin(admin);
      setEndTime(endTime);
      setRemainingShare(remainingShare);
      setTotalShare(totalShares);
      setDataLoader(false);
    } catch (error) {
      console.log(error);
      setDataLoader(false);
    }
  };
  useEffect(() => {
    getData();
    getList();
  }, []);

  return (
    <DAOContext.Provider
      value={{
        admin,
        endTime,
        remainingShare,
        totalShare,
        dataLoader,
        contributeShare,
        contributeChange,
        contributeLoader,
        proposalChange,
        createProposal,
        proposalData,
        contribute,
        proposalLoader,
        proposalList
      }}
    >
      {children}
    </DAOContext.Provider>
  );
};
