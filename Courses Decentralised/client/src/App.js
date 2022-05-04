import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// import { getWeb3 } from "./web3";
import Footer from "./components/Footer";
import Content from "./components/Content";
// import Loader from "../utils/loader";
const App = () => {
  useEffect(() => {}, []);
  const [details,setDetails]=useState({
    admin:null,
    user:null,
    userBalance:null,
    contractBalance:null,
  });

  

  return (
    <>
      {/* <div className="container-fluid">
        <div className="row bg-dark">
          <div className="col-md-12 col-12 col-xs-12 col-sm-12 mx-auto p-2 d-flex justify-content-between">
            <button className="btn mx-2">
              <i class="fa-solid fa-heading mx-2">ead</i> 0x0345...879
            </button>

            <div>
              <button className="btn connect mx-2">
                Connect Your Wallet <i class="fa-solid fa-wallet"></i>
              </button>
              <button className="btn ">
                Balance : 4.0657 <i class="fa-solid fa-coins"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* ****************************** */}
      <div className="container-fluid">
        <Navbar />
        <Content/>
        <Footer/>
      </div>
    </>
  );
};

export default App;
