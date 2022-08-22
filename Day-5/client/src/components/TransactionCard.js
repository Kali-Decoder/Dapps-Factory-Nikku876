import React from "react";
import Giphy from "./Giphy";
const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  
}) => {
  
  const url= Giphy(keyword);
  return (
    <div className="card p-1 mt-4 mb-5">
      <div className="card-body">
        <img src={url} alt="" className="card-img" />
        <div>
          <h6 className="text-white mt-3">Sender :</h6>
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
          https://ropsten.etherscan.io/address/{addressFrom}
          </a>
        </div>
        <div>
          <h6 className="text-white mt-3">Reciever :</h6>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
          https://ropsten.etherscan.io/address/{addressTo}
          </a>
        </div>
        <div>
          <h6 className="text-white mt-3">Purpose :</h6>
          <code className="text-danger text-capitalize">{message}</code>
        </div>
        <div>
          <h6 className="text-white mt-3">Amount :</h6>
          <code className="text-danger">
            <spa className="text-success">{amount}</spa> ETH
          </code>
        </div>
        <h5 className="text-center text-white mt-4">
          <strong>{timestamp}</strong>
        </h5>
      </div>
    </div>
  );
};

export default TransactionCard;
