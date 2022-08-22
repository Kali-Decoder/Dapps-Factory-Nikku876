import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Link from 'next/link';
import campaignDeploy from "../../../../ethereum/campaign";
import Loader from "../../../components/Loader";
import web3 from "../../../../ethereum/web3";

const IdCampaign = () => {
  const router = useRouter();
  const id = router.query.campaignId;

  const [contributor, setContributor] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    balance: 0,
    requests: 0,
    contributors: 0,
    minContribution: 0,
    manager: "",
  });
  
  const getData = async () => {
    try {
      const campaign = await campaignDeploy(id);
      // console.log(campaign);
      const array = await campaign.methods.getSummary().call();

      setSummary({
        balance: array[1],
        requests: array[2],
        contributors: array[3],
        minContribution: array[0],
        manager: array[4],
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const accounts= await web3.eth.getAccounts();
      const campaign = await campaignDeploy(id);
      setLoading(true);
      const tx = await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: contributor });
      console.log(tx);
      getData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    return () => {
      
    };
  }, [id,summary,loading]);
  return (
    <>
      <Navbar />
      <div className="container mb-5">
        
        <div className="row mt-3">
          <div className="col-md-7 col-7 col-xs-7 col-sm-7 mt-3 mx-auto">
            <h5 className="text-danger ">Campaign Details</h5>
            <code className="text-center text-success">{id}</code>
            <div className="d-flex justify-content-around mt-3">
              <div className="card px-3 py-3">
                {summary.balance ? <p>{summary.balance} Wei</p> : <Loader />}
                <code className="text-left text-danger">Campaign Balance</code>
              </div>
              <div className="card px-3 py-3">
                {summary.minContribution ? (
                  <p>{summary.minContribution} Wei</p>
                ) : (
                  <Loader />
                )}
                <code className="text-left text-danger">
                  Minimum Contribution
                </code>
              </div>
            </div>
            <div className="d-flex justify-content-around mt-3">
              <div className="card px-3 py-3">
                {summary.requests ? <p>{summary.requests}</p> : <Loader />}
                <code className="text-left text-danger">Total Requests</code>
              </div>
              <div className="card px-3 py-3">
                {summary.contributors ? (
                  <p>{summary.contributors}</p>
                ) : (
                  <Loader />
                )}
                <code className="text-left text-danger">Contributors</code>
              </div>
            </div>
            <button
              className="button mt-4 "
              style={{ width: "auto", height: "auto" }}
            >
              <Link href={`/campaigns/requests/${id}`} >
                View Requests
              </Link>
            </button>
          </div>
          <div className="col-md-5 col-5 col-xs-5 col-sm-5 mx-auto mt-5">
            <h5 className="text-danger ">Contribute To This Campaign :-</h5>
            <input
              type="text"
              className="mt-3"
              placeholder="Amount(in Wei)"
              name="amount"
              onChange={(e) => {
                setContributor(e.target.value);
              }}
            />
            <button
              className="button mt-4"
              onClick={handleClick}
              style={{ width: "auto", height: "auto" }}
            >
              {loading ?<Loader/> : "Contribute" }
            </button>
            <div
              className="mt-4 p-3"
              style={{ width: "100%", backgroundColor: "white" }}
            >
              <h6 className="text-left">
                {summary.manager ? summary.manager : <Loader />}
              </h6>
              <div className="card-body">
                <code className="text-left mt-3 text-secondary">
                  Address Of Manager
                </code>
                <br />
                <code className=" text-success mt-2">
                  The Manger creates this campaign and create requests to
                  withdraw money all is trustworthy because of blockchain
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdCampaign;
