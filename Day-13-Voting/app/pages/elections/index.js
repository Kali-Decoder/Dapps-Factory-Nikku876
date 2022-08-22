import React from "react";
import SingleElection from "../../Components/SingleElection";
import { elections } from "../../dummyElection";
const ElectionList = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-12 col-12 mx-auto content p-2">
            <div className="row mt-1">
              {elections.map((item, i) => (
                <SingleElection item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionList;
