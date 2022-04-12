import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import web3 from "./web3";
import todoContract from "./todo";
import List from "./List";
// const moment= require('moment')
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metamaskAddress, setMetaMaskAddress] = useState("");
  const [formData, setFormData] = useState({
    content: "",
    author: "",
  });
  const [listItems, setListItems] = useState([]);
  const [noOfTasks, setnoOfTasks] = useState(0);

  const getIds = async () => {
    try {
      const Ids = await todoContract.methods.getTaskIds().call();
      setnoOfTasks(Ids.length);
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const connectWallet = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMetaMaskAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskItem = async () => {
    try {
      let newArray = [];
      for (let i = 1; i <= noOfTasks; i++) {
        const item = await todoContract.methods.getTask(i).call();

        newArray.push(item);
      }
      newArray = newArray.map((item) => {
        return {
          time:  item[1],
          content: item[2],
          author: item[3],
          done: item[4],
        };
      });
      console.log(newArray)
      setListItems(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      setIsLoading(true);
      const txn = await todoContract.methods
        .createTodo(formData.content, formData.author)
        .send({ from: accounts[0], gas: "1000000" });
      console.log(txn);
      setIsLoading(false);
      getIds();
      getTaskItem();
      setFormData({ content: "", author: "" });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
    getIds();
    getTaskItem();
  }, []);

  useEffect(() => {
    connectWallet();
    getIds();
    getTaskItem();
  }, [isLoading,noOfTasks]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-7 col-7 mx-auto main">
            <div className="div mt-5">
              <h1 className="text-center">
                Web3 <i class="fa-solid fa-school mx-2"></i> School
              </h1>
            </div>
            <p className="text-center text-danger">
              <strong>
                {metamaskAddress ? metamaskAddress : "No Meta Mask Is Detected"}
              </strong>
            </p>
            <form action="" className="mt-3">
              <input
                type="text"
                placeholder="Task (eg. Making Food For MOM )"
                name="content"
                className="mt-2"
                value={formData.content}
                onChange={onchange}
              />

              <input
                type="text"
                placeholder="Done By (eg. Stephen )"
                name="author"
                className="mt-2"
                value={formData.author}
                onChange={onchange}
              />

              <button className="button mt-2" onClick={handleClick}>
                {isLoading ? <Loader /> : "Save On Blockchain"}
              </button>
            </form>
          </div>
          <div className="col-md-5 col-5 mx-auto main list p-4">
            <h6 className="text-info text-center">List Of Tasks</h6>
            <p className="text-danger text-center">
              Total Number Of Tasks Pending : {noOfTasks}
            </p>
            <ul>
              {listItems.map((item,i)=>{
                return (
                  <li key={i}>
                    <List key={i}  value={item} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
