import React,{useContext} from "react";
import { DAOContext } from "./context/DAOContext";
import Spinner from "./Spinner";

const Contribution = () => {
  const { contributeShare, contributeChange,contributeLoader,contribute } = useContext(DAOContext);
  return (
    <>
      <form>
      <h4 className="text-danger mt-2 mb-2">
          Contribute Your Funds
      </h4>
        <div className="form-group">
          <label for="exampleInputEmail1">From Which Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            name="account"
            value={contribute.account}
            onChange={(e)=>contributeChange(e,e.target.name)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your Address with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Amount</label>
          <input
            type="text"
            className="form-control"
            placeholder="Amount in Wei"
            name="amount"
            value={contribute.amount}
            onChange={(e)=>contributeChange(e,e.target.name)}
          />
        </div>
        {contributeLoader ? <Spinner/> : <button type="submit" className="btn btn-primary" onClick={(e)=>contributeShare(e)}>
          Contribute
        </button>}
      </form>
    </>
  );
};

export default Contribution;
