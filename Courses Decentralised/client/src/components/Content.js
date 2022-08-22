import React,{useState,useEffect} from "react";
import CourseCard from "./CourseCard";
import getWeb3 from "../utils/web3";
import getContract from "../utils/contract";
import Loader from "../utils/loader";
const Content = () => {
  const [arrayData, setArrayData] = useState([]);
  const [contract, setContract] = useState(null);
  const getArray = async () => {
    try {
      const x = await contract.methods.getAllCourses();
      console.log(x);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    let web3 = await getWeb3();
    const contract = await getContract();
    setContract(contract);
  };

  useEffect(() => {
    getData();
    getArray();
  }, []);

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
      </div>

      <div className="container">
        <div className="row mt-2"></div>
        <div className="col-md-4 col-10 col-xs-4 col-sm-4 mx-auto">
          <CourseCard />
        </div>
      </div>
    </div>
  );
};

export default Content;
