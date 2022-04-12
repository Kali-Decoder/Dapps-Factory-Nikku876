import React, { useContext } from "react";
import Spinner from "./Spinner";
import { DAOContext } from "./context/DAOContext";
const MakeProposal = () => {
  const { proposalChange, createProposal,proposalData,proposalLoader } = useContext(DAOContext);
  return (
    <>
      <form>
        <h4 className="text-danger mt-2 mb-2">Make Your Proposals</h4>
        <div className="form-group">
          <label className="mt-2" for="exampleInputEmail1">
            Name Who Created Proposal
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={proposalData.name}
            onChange={(e) => proposalChange(e, e.target.name)}
          />

          <label className="mt-2" for="exampleInputEmail1">
            Recepient Address
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Recepient Address"
            name="to"
            value={proposalData.to}
            onChange={(e) => proposalChange(e, e.target.name)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your Address with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label className="mt-2" for="exampleInputPassword1">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Amount in Wei"
            name="amount"
            value={proposalData.amount}
            onChange={(e) => proposalChange(e, e.target.name)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e)=>createProposal(e)}
        >
          {proposalLoader ? <Spinner/> : "Create Proposal"}
        </button>
      </form>
    </>
  );
};

export default MakeProposal;
