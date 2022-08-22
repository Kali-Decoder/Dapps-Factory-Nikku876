import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/web3";
import getContract from "../utils/contract";
import Loader from "../utils/loader";
const Navbar = () => {
  const [admin, setAdmin] = useState();
  const [user, setUser] = useState(null);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    picUrl: "",
    instructor: "",
    price: 0,
    description: "",
    category: 0,
    owner: "",
  });
  

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData,[name]:value});
  };
  const getData = async () => {
    let web3 = await getWeb3();
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setUser(accounts[2]);
    const contract = await getContract();
    setContract(contract);
  };
  
  useEffect(() => {
    getData();
  }, []);
  const getAdmin = async () => {
    getData();
    const admin = await contract.methods.admin().call();

    setAdmin(admin);
    console.log(admin);
  };

  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-cube"></i>
            <strong className="text-white">DCS</strong>
            <i className="fa-solid fa-cube"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-3">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  SEARCH
                </a>
              </li>
              {admin == user ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="modal"
                    data-target="#exampleModal2"
                  >
                    Add Course
                  </a>
                </li>
              ) : null}

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={getAdmin}
                >
                  admin
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="button mt-2 p-1 mx-3"
                  data-toggle="modal"
                  data-target="#exampleModal1"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
            <div className="d-flex justify-content-between icons mx-3 mt-3">
              <a href="">
                <i className="fa-brands fa-instagram mx-2 text-white"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-whatsapp mx-2 text-white"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-linkedin mx-2 text-white"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-telegram mx-2 text-white"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-github mx-2 text-white"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-12 col-12 col-xs-12 col-sm-12 mx-auto">
            <img
              src="https://thehackernews.com/new-images/img/a/AVvXsEgseMugOlMQlJWC-iCctJFsgrsLvn4-y1JQ70Kx7gtzVJxz2BPkR4vU3p-4TpYpp0JVxflNFwYRgM_avpDWlop5fQ27z4CR1P-tAMZwl4qLC-aXqHSoq7ddBtDEswWfvM04WdMHUIZB0UibwGuXMPcuTpTAnP3fBtI3bX-oCm_E-UXAlJ41bMRpzzFM=s728-e1000"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Decentralised Courses Manager Wallet Address
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
                <p>
                  Here is the admin address{" "}
                  {admin ? (
                    <sapn className="text-danger">{admin}</sapn>
                  ) : (
                    <Loader />
                  )}
                </p>
                <p>
                  Mutant Ape Yacht Club is a collection of digital artworks
                  (NFTs) running on the Ethereum network. This website is only
                  an interface allowing participants to purchase digital
                  collectibles. Users are entirely responsible for the safety
                  and management of their own private Ethereum wallets and
                  validating all transactions and contracts generated by this
                  website before approval. Furthermore, as the Mutant Ape Yacht
                  Club smart contract runs on the Ethereum network, there is no
                  ability to undo, reverse, or restore any transactions.
                </p>
                <p>
                  This website and its connected services are provided “as is”
                  and “as available” without warranty of any kind. By using this
                  website you are accepting sole responsibility for any and all
                  transactions involving Mutant Ape Yacht Club digital
                  collectibles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {admin ? admin : "Connect Your MetaMask "}
                  <button className="button mx-3">Metamask</button>
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
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabe2">
                  Register Your Decentralised Course
                </h5>
              </div>
              <form action="" className="p-3 mb-3">
                <input
                  type="text"
                  name="owner"
                  id="owner"
                  className="form-control mt-3 bg-dark text-white"
                  placeholder="Wallet Address of Owner"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control mt-3 bg-dark text-white"
                  placeholder="Course Name"
                />
                <input
                  type="text"
                  name="instructor"
                  id="instructor"
                  className="form-control mt-3 bg-dark text-white"
                  placeholder="Instructor Name"
                />
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="form-control mt-3 bg-dark text-white"
                  placeholder="Paste Url Of Course"
                />
                <input
                  type="url"
                  name="picUrl"
                  id="picUrl"
                  className="form-control mt-3 bg-dark text-white"
                  placeholder="Picture Url"
                />
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.1"
                  className="form-control mt-3 bg-dark text-white"
                />
                <textarea
                  name="description"
                  placeholder="Description of course"
                  className="form-control mt-3 bg-dark text-white"
                  cols="30"
                  rows="10"
                ></textarea>
                <select name="" className="custom-select bg-dark" id="">
                  <option value="1">NFT</option>
                  <option value="2">NFT</option>
                  <option value="3">NFT</option>
                  <option value="4">NFT</option>
                  <option value="5">NFT</option>
                  <option value="6">NFT</option>
                  <option value="7">NFT</option>
                  <option value="8">Other</option>
                </select>

                <button className="btn mt-3">Submit My D-Course</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
