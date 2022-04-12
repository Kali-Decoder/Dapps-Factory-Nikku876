import React, { useContext } from "react";
import { DAOContext } from "./context/DAOContext";
import Contribution from "./Contribution";
import ListProposal from "./ListProposal";
import Loader from "./Loader";
import MakeProposal from "./MakeProposal";
import Spinner from "./Spinner";
const App = () => {
  const { admin, endTime, remainingShare, totalShare, dataLoader,proposalList } =
    useContext(DAOContext);
  return (
    <>
      <div className="container mb-5">
        <div className="row mt-2">
          <div className="col-md-3 mx-auto info p-3">
            <div className="card p-3">
              <h4 className="text-center">Total Shares</h4>
              {dataLoader ? (
                <Loader />
              ) : (
                <span className="text-danger">{totalShare}</span>
              )}
            </div>
          </div>
          <div className="col-md-3 mx-auto info p-3">
            <div className="card p-3">
              <h4 className="text-center">Remaining Shares</h4>
              {dataLoader ? (
                <Loader />
              ) : (
                <span className="text-danger">{remainingShare}</span>
              )}
            </div>
          </div>
          <div className="col-md-3 mx-auto info p-3">
            <div className="card p-3">
              <h4 className="text-center">End Time</h4>
              {dataLoader ? (
                <Loader />
              ) : (
                <span className="text-danger">{endTime}</span>
              )}
            </div>
          </div>
          {/* <div className="col-md-3 mx-auto info p-3">
            <div className="card p-3">
              <h4 className="text-center">DAO Owner</h4>
              {dataLoader ? (
                <Loader />
              ) : (
                <span className="text-danger">{`${admin.substr(
                  0,
                  6
                )}...${admin.substr(30, 46)}`}</span>
              )}
            </div>
          </div> */}
        </div>
        <div className="row mt-4">
          <div className="col-md-3 col-3 col-xs-3 col-lg-3 mx-auto">
            <MakeProposal/>
          </div>
          <div className="col-md-6 col-6 col-xs-6 col-lg-6 mx-auto listProposal">
          <h4 className="text-center mt-2 mb-2 text-danger">All Proposals List</h4>
          <ul class="list-group p-2">
            {proposalList ? proposalList.map((item,i)=>{
              return(<ListProposal key={i} item={item} />);
            }) :<Spinner/>}
          </ul>
            
          </div>
          <div className="col-md-3 col-3 col-xs3 col-lg-3 mx-auto">
            <Contribution/>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
