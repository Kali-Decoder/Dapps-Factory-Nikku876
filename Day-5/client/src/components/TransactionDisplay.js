import React, { useContext } from "react";
import TransactionContext from "./ContextTransaction";
import TransactionCard from "./TransactionCard";
import dummyData from "../utils/dummyData";
const TransactionDisplay = () => {
  const { transactions, transactionCount } = useContext(TransactionContext);
  const styleObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <>
      <div className="container mt-5" style={styleObject}>
        {transactionCount ? (
          <span className="text-suceess">
            <strong>Number Of Transactions Yet 🪙 {transactions.length} </strong>
          </span>
        ) : (
          <span className="text-danger">
            <strong>There Are No Transaction Yet 🪙 </strong>
          </span>
        )}
      </div>
      <div className="row mt-3">
        <div className="col-md-4 col-10 col-xl-4 mx-auto">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionDisplay;
