import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
const registerNew = () => {
  const [campaignAmount, setcampaignAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router= useRouter();
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length == 0) {
        setErrorMessage("Please Install Meta Mask");
      }

      const tx = await factory.methods
        .createCampaign(campaignAmount)
        .send({ from: accounts[0], gas: "1000000" });
      console.log(tx);
      router.push("/");
      
    } catch (error) {
      console.log(error);
      setErrorMessage(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-10 col-10 mx-auto second">
            <h6 className="text-center mt-4">
              Contribute To Campaigns{" "}
              <strong className="text-danger">
                (Minimum Contributions 100 wei)
              </strong>
            </h6>
            {isLoading ? <Loader /> : null}
            <form action="" className="mt-3 ">
              {errorMessage ? (
                <code className="text-danger text-center">{errorMessage}</code>
              ) : null}
              <input
                type="text"
                placeholder="Amount(in Wei)"
                name="amount"
                value={campaignAmount}
                onChange={(e) => {
                  setcampaignAmount(e.target.value);
                }}
              />
              <button
                className="createButton mt-3"
                onClick={handleClick}
                style={{ width: "3rem", height: "3rem" }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default registerNew;
