import React from "react";

import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <>
      
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-10 mx-auto">
            <h3 className="text-center">
              <strong>CrowdCoin 🪙</strong>
            </h3>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 col-12 col-xs-12 col-sm-12 mx-auto nav d-flex justify-content-between">
            <button
              className="button"
              onClick={() => {
                router.push("/");
              }}
            >
              CrowdCoin
            </button>
            <div className="flex">
              <button
                className="button"
                onClick={() => {
                  router.push("/");
                }}
              >
                Campaigns
              </button>
              <button
                className="button"
                onClick={() => {
                  router.push("/campaigns/new");
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
