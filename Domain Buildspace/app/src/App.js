import React, { useState, useEffect } from "react";
import { getWeb3 } from "./utils/web3";
import { getContract } from "./utils/contract";
const App = () => {
  useEffect(async () => {
    let web3 = await getWeb3();
    console.log(web3);
  }, []);
  return (
    <>
      <img src="" alt="" />
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-10 col-12 col-xs-10 col-xm-10 mx-auto p-2">
            <h4 className="text-center">Ninja Name Service (NNS)</h4>
            <p className="text-left">
              This is Immortal, Distributed ,Transparency Domain Service{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
