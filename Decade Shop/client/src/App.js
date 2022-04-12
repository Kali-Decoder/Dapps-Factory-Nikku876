import React, { useContext } from "react";
import Navbar from './components/Navbar';
import { MarketContext } from "./context/Context";
const App = () => {
    const {isConnected}= useContext(MarketContext);
    // console.log(isConnected);
  return (
    <>
      <div className="container mt-3">
        <div className="row mt-1">
          <div className="col-md-10 mx-auto d-flex justify-content-between">
            <Navbar/>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
