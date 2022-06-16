import React, { useContext } from "react";
import styles from "./navbar.module.css";
import { TinderContext } from "../context/Tinder";
import Spinner from '../Spinner';
const Navbar = () => {
  const { getDetails, currentWalletAddress,onChange,formData,onClick,postLoader,accounts,setCurrentWalletAddress } = useContext(TinderContext);
  return (
    <>
      <nav className="flex align-center">
        <p>
          <span>Decentralise </span>Tinder
        </p>
        <ul className="mt-3">
          <li className="big-screens">
            <button
              className={`${styles.btn} ${styles.register}`}
              data-toggle="modal"
              data-target="#exampleModalCenter1"
            >
              Register Yourself
            </button>
            {currentWalletAddress ? (
              <button
                className={`${styles.btn} ${styles.login}`}
                data-toggle="modal"
                data-target="#exampleModalCenter2"
              >
                {currentWalletAddress.substr(0, 10)}...
              </button>
            ) : (
              <button
                className={`${styles.btn} ${styles.login}`}
                data-toggle="modal"
                data-target="#exampleModalCenter2"
              >
                ConnectWallet
              </button>


            )}
          </li>
        </ul>
      </nav>

      {/* modal */}
      {/* name ,city ,gender,age,picurl */}
      <div
        className="modal fade"
        id="exampleModalCenter1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Create New Account
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <small className="form-text text-muted">Enter Your Name </small>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className=" form-control"
                  value={formData.name}
                  onChange={onChange}
                />

                <small className="form-text text-muted mt-2">Enter Your Age </small>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  className=" form-control "
                  onChange={onChange}
                />

                <small className="form-text text-muted mt-2">
                  Choose Your City{" "}
                </small>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                >
                  <option value="null">City</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="jamshedpur">Jamshedpur</option>
                  <option value="udaipur">Udaipur</option>
                  <option value="up">Uttar Pradesh</option>
                </select>

                <small className="form-text text-muted mt-2">
                  Choose Your Gender{" "}
                </small>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="gender"
                  onChange={onChange}
                  value={formData.gender}
                >
                  <option value="null">Gender</option>
                  <option value="0">Male 🕵️‍♂️ </option>
                  <option value="1">Female 🕵️‍♀️ </option>
                </select>

                <small className="form-text text-muted mt-2">Paste Pic URL </small>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={formData.url}
                  className=" form-control "
                  onChange={onChange}
                />
                <div className="d-flex justify-content-center">
                  {postLoader ? <button className={`btn btn-success mt-3`} onClick=
                  {onClick}><Spinner/></button>:<button className={`btn btn-success mt-3`} onClick=
                  {onClick}>Create</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* accounts modal  */}
      <div
        className="modal fade"
        id="exampleModalCenter2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Choose An Account Address 
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                {accounts.length==0 ? "No Accounts Is Present ": accounts.map((item)=>{
                  return(<div className="address p-2 mt-1" key={item}>
                    <code className="text-danger" data-dismiss="modal" onClick={(e)=>setCurrentWalletAddress(item)}>{item}</code>
                </div>);
                })}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
