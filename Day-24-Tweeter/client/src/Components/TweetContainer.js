import React from "react";

const TweetContainer = ({ tweet }) => {
  const { author, date, description, id } = tweet;
  return (
    <>
      <div className="tweet-text p-4 ">
        <div className="d-flex">
          <div className="profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9v3fy22EQRsFO2DFR4EnFL1i2hbSDTB2IptaA8IHtHFTWVteKXUHXKtgBfokFVmvoCw&usqp=CAU"
              alt=""
              style={{ width: "2rem", height: "2rem" }}
            />
          </div>
          <div className="text mx-3 ">
            <p className="address mt-2">
              Neeraj Choubisa <span className="text-primary" style={{fontSize:'8px'}}>🇮🇳 ({author.substr(0,10)}...{author.substr(30,40)})</span>
            </p>
            <p className="tweet">
              {description}
            </p>
          </div>
        </div>
        <div className="icons d-flex justify-content-between px-4 mt-1">
          <i className="fa-solid fa-feather"></i>
          <i className="fa-solid fa-retweet"></i>
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-solid fa-comment"></i>
        </div>
      </div>
    </>
  );
};

export default TweetContainer;
