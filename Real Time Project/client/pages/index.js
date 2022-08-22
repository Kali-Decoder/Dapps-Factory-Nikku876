import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CampaignItem from "../components/CampaignItem";
import factory from "../../ethereum/factory";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
const index = () => {
  const router = useRouter();
  const [listCampaigns, setListCampaigns] = useState([]);

  const getList = async () => {
    try {
      const array = await factory.methods.getDeployedCampains().call();

      setListCampaigns(array);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="container mb-5">
        <Navbar />
        <div className="row mt-5">
          <div className="col-md-6 col-6 col-xs-6 col-sm-6 mx-auto p-3">
            <h6 className="text-center" style={{ textDecoration: "underline" }}>
              There Are{" "}
              <strong className="text-danger">{listCampaigns.length ?  listCampaigns.length:<Loader/> }</strong>{" "}
              Campaigns Opened !!!
            </h6>
            {listCampaigns.length ? <div className="campaign-list mt-2 p-4">
              {listCampaigns.map((campaign, i) => {
                  
                return <CampaignItem key={i} value={campaign} />;
              })}
            </div>: <Loader/>}
          </div>
          <div className="col-md-6 col-6 col-xs-6 col-sm-6 mx-auto second">
            <h4 className="text-center">Create Campaign</h4>
            <button
              className="createButton mt-3"
              onClick={() => {
                router.push("/campaigns/new");
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
