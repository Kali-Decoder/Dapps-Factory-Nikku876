import React from "react";

const Content = () => {
  return (
    <div>
      <div className="container mt-4 mb-5">
        <div className="row mt-2 category">
          <div className="col-md-12 col-12 mx-auto">
            <h1 className="text-left text-white">CATEGORIES</h1>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12 col-12 col-xs-12 col-sm-12 mx-auto d-flex">
            <button className="button mx-2">Games and Collectibles</button>
            <button className="button mx-2">NFT</button>
            <button className="button mx-2">DeFi</button>
            <button className="button mx-2">DAO</button>
            <button className="button mx-2">ICO</button>
            <button className="button mx-2">Finance</button>
            <button className="button mx-2">Supply Chain</button>
            <button className="button mx-2">Metaverse</button>
            <button className="button mx-2">Marketplace</button>
            <button className="button mx-2">Others</button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="course-card">
              <div className="course-card-img">
                {/* <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png"
                  className="main"
                  alt=""
                />
                <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png"
                  className="layered"
                  alt=""
                /> */}
              </div>
              <div className="course-card-content">
                <h4>Sketch App Masterclass</h4>
                <h6>$ 19.99</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
