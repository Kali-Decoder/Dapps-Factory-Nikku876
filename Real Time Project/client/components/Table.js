import React, { useState } from "react";
import web3 from "../../ethereum/web3";
import campaignDeploy from "../../ethereum/campaign";
import Loader from "./Loader";
import { useRouter } from "next/router";
const Table = ({ fetch }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [errorMesaage, setErrorMesaage] = useState("");
  const getApprove = async (i, reqId) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await campaignDeploy(reqId);
      setLoading(true);
      const txn = await campaign.methods
        .approveRequest(i)
        .send({ from: accounts[0], gas: "1000000" });
      console.log(txn);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMesaage("Transaction Failed Please Try Again !!!");
    }
  };
  const getFinalyze = async (i, reqId) => {
    try {
      const accounts = await web3.eth.getAccounts();

      const campaign = await campaignDeploy(reqId);
      setFinalLoading(true);
      const txn = await campaign.methods
        .finalizeRequest(i)
        .send({ from: accounts[0], gas: "1000000" });

      setFinalLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setErrorMesaage(
        "Finalization Error Try Again... or You Are Not Owner !!!"
      );
      setFinalLoading(false);
    }
  };
  return (
    <>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Recipient</th>
            <th scope="col">Approval Count</th>
            <th scope="col">Approve</th>
            <th scope="col">Finalyze</th>
          </tr>
        </thead>
        <tbody>
          {fetch.map((ele) => {
            const {
              i,
              approvalCount,
              complete,
              description,
              recipient,
              value,
              noOfRequests,
              reqId,
            } = ele;

            return (
              <tr className="">
                <th scope="row" style={{ fontSize: "12px" }}>
                  {i + 1}
                </th>
                <td>{description}</td>
                <td className="text-success">
                  {web3.utils.fromWei(value, "ether")} Ether
                </td>
                <td>{recipient}</td>
                <td className="text-danger">
                  {approvalCount}/{noOfRequests}
                </td>

                <td>
                  {complete ? (
                    <i className="fa-solid fa-check text-success fa-2x mx-3"></i>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        getApprove(i, reqId);
                      }}
                    >
                      {loading ? <Loader /> : "Approve"}
                    </button>
                  )}
                </td>
                <td>
                  {complete ? (
                    <i className="fa-solid fa-check text-success fa-2x mx-3"></i>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        getFinalyze(i, reqId);
                      }}
                    >
                      {finalLoading ? <Loader /> : "Finalyze"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;

// {complete ?<i className="fa-solid fa-check text-success fa-2x mx-3"></i> : <i className="fa-solid fa-xmark text-danger fa-2x mx-3"></i> }
// {complete ?<i className="fa-solid fa-check text-success fa-2x mx-3"></i> : <i className="fa-solid fa-xmark text-danger fa-2x mx-3"></i> }
