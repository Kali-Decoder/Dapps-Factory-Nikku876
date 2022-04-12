import React, { useState, useEffect } from "react";
import getWeb3 from "./Components/constant/web3";
import getContract from "./Components/constant/Contract";
import Loader from "./Components/Loader";
import TweetContainer from "./Components/TweetContainer";
import Account from "./Components/Account";
const App = () => {
  const [contract, setContract] = useState(undefined);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const [tweets, setTweets] = useState([]);
  const [accounts,setAccounts]=useState([]);
  const onchange = (e) => {
    setData(e.target.value);
  };
  const gettingContract = async () => {
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    setCurrentUser(accounts[0]);
    let contract = await getContract();
    setContract(contract);
    if (accounts.length > 0) {
      setIsWalletConnected(true);
    }
    getList();
  };
  const tweet = async (e) => {
    e.preventDefault();
    if (!data) {
      alert("Please Enter Tweet");
      return;
    }
    try {
      if (contract && currentUser) {
        setLoader(true);
        const tx = await contract.methods
          .createTweet(data)
          .send({ from: currentUser, gas: "1000000" });

        console.log(tx);
        setLoader(false);
        setData("");
        getList();
      } else {
        alert("Please Connect Metamask");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const getList = async () => {
    try {
     
      if (contract) {
        let totalTweets = await contract.methods.getListTweets().call();
       let newArray=  totalTweets.map((item)=>{
         return {author: item.author,
         date: item.date,
         description: item.description,
         id: item.id};
       })
       setTweets(newArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettingContract();
    getList();
  }, []);

  return (
    <>
      <div className="container mb-5">
        {loader ? (
          <Loader/>
        ) : null}
        <div className="row">
          <div className="col-md-3 col-3 col-xs-3 col-sm-3 mx-auto notification py-4 ">
            {accounts.length>0 ? accounts.map((account,i)=>{
              return ( <Account  account={account} key={i} /> )
            }) :null }
          </div>
          <div className="col-md-6 col-6 col-xs-6 col-sm-6 mx-auto  ">
            <div className="twitter-input px-3 py-2  post">
              <div className="d-flex justify-content-between text-white">
                <h6 className="mt-2">Home</h6>
                <i className="fa-brands fa-twitter text-primary fa-2x"></i>
              </div>
              <div className="d-flex justify-content-around mt-2">
                <div className="profile">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9v3fy22EQRsFO2DFR4EnFL1i2hbSDTB2IptaA8IHtHFTWVteKXUHXKtgBfokFVmvoCw&usqp=CAU"
                    alt=""
                  />
                </div>
                <div>
                  <form action="">
                    <textarea
                      name="desc"
                      placeholder="Want to post immutable things ??"
                      id=""
                      cols="30"
                      rows="5"
                      onChange={onchange}
                      value={data}
                    ></textarea>

                    <div className="float-right">
                      <button
                        className="twitter-button mt-2 bg-primary mb-3"
                        onClick={tweet}
                      >
                        Tweet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {tweets.length>0 ? tweets.map((tweet,i)=>{
              return (<TweetContainer tweet={tweet} key={i} />)
            }): <Loader/>}
          </div>
          <div className="col-md-3 col-3 col-xs-3 col-sm-3 mx-auto post connect ">
            <div>
              <small className="float-right text-white">
                {currentUser && isWalletConnected
                  ? `${currentUser.substr(0, 10)}...${currentUser.substr(
                      30,
                      40
                    )}`
                  : "No Account Is Connected"}{" "}
              </small>
              <button
                className="twitter-button mt-2 bg-primary mb-3 float-right"
                onClick={gettingContract}
              >
                Connect Wallet <i className="fa-solid fa-lock mx-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
