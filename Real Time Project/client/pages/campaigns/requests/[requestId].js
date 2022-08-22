import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/Table";
import Link from "next/link";
import web3 from "../../../../ethereum/web3";
import campaignDeploy from "../../../../ethereum/campaign";
import Loader from "../../../components/Loader";
const RequestId = () => {
  const [isowner, setIsOwner] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const router = useRouter();
  const reqId = router.query.requestId;

  const getIsOwner = async () => {
    try {
      const campaign = await campaignDeploy(reqId);
      const owner = await campaign.methods.manager().call();
      const accounts = await web3.eth.getAccounts();
      if (accounts[0] === owner) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRequests = async () => {
    try {
      const campaign = await campaignDeploy(reqId);
      const noOfRequests = await campaign.methods.getRequestCount().call();
      let requestsArray = [];
      for (let i = 0; i < noOfRequests; i++) {
        const array = await campaign.methods.requests(i).call();
        const { approvalCount, complete, description, recipient, value } =
          array;
        const newObj = {
          i,
          approvalCount,
          complete,
          description,
          recipient,
          value,
          noOfRequests,
          reqId,
        };
        requestsArray.push(newObj);
      }
      
      setAllRequests(requestsArray);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getIsOwner();
    getAllRequests();
    return () => {
      setIsOwner(false);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row mt-1">
          <div className="col-md-10 col-10 col-xs-10 col-sm-10 mx-auto d-flex justify-content-between">
            <h5 className="text-left mt-3">Requests List </h5>
            {isowner ? (
              <button className="button">
                <Link href={`/campaigns/requests/create/${reqId}`}>
                  Add Request
                </Link>
              </button>
            ) : null}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-10 col-10 col-xs-10 col-sm-10 mx-auto d-flex justify-content-between">
            {allRequests.length ? <Table key={1} fetch={allRequests} /> : <Loader />}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-10 col-10 col-xs-10 col-sm-10 mx-auto d-flex justify-content-between">
            <code className="text-left text-success">
              Found {allRequests.length} Request
            </code>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestId;
