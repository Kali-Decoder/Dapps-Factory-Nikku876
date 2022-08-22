import React from "react";
import NickToken from "./artifacts/contracts/NickToken.sol/NickToken.json";
import Faucet from "./Faucet";
import TokenSend from "./TokenSend";
const App = () => {
  const Token = NickToken;
  return (
    <div className="container">
      <div className="row mt-">
        <div
          className="col-md-4 col-4 col-sm-4 mx-auto p-1"
          
        >
          <Faucet tokenContract={Token} />
        </div>

        <div
          className="col-md-8 col-8 col-sm-8 mx-auto p-1"
          
        >
          <TokenSend tokenContract={Token} />
        </div>
      </div>
    </div>
  );
};

export default App;
