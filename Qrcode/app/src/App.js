import React, { useEffect, useState } from "react";
import Qrcode from "./utils/index";
import urlExist from "./utils/urlExist";
const App = () => {
  const [account, setAccount] = useState(null);
  const [exist, setExist] = useState(true);
  const isExist = async (link) => {
    let x = await urlExist(link);
    setExist(x);
  };
  const getCode = async (link) => {
    let url = await Qrcode(link);
    console.log(url);
    return url;
  };

  return (
    <>
      {" "}
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-10 col-10 col-xs-10 mx-auto header p-4 d-flex justify-content-between">
            <a className="px-2 py-1">
              <i className="fa-solid fa-barcode"></i>- DCODE
            </a>
            {account ? (
              <code className="text-success mt-2">{account}</code>
            ) : (
              <code className="text-danger mt-2">No Wallet Is Connected</code>
            )}
            <a className="px-2 py-1">
              <i className="fa-solid fa-wallet"></i> - Wallet
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-10 col-10 col-xs-10 mx-auto">
            {exist?<code className="text-danger mt-2">URL Not exist</code> :<code className="text-success mt-2">Url  Exist</code>  }
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
