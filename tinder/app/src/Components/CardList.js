import React, { useContext, useState } from "react";
import Card from "./Card";
import { TinderContext } from "../context/Tinder";
const CardList = () => {
  const { matchableData, getMatchableAccounts } = useContext(TinderContext);
  return (
    <>
      <div className="container mt-3">
        <div className="row mt-2">
          <div className="col-md-12 mx-auto col-10 col-xs-10 d-flex justify-content-between">
            <div className="category p-3 py-4">
              <strong onClick={()=>getMatchableAccounts("delhi")}>Delhi</strong>
            </div>
            <div className="category p-3 py-4">
              <strong onClick={()=>getMatchableAccounts("jamshedpur")}>Jamshedpur</strong>
            </div>
            <div className="category p-3 py-4">
              <strong onClick={()=>getMatchableAccounts("mumbai")}>Mumbai</strong>
            </div>
            <div className="category p-3 py-4">
              <strong onClick={()=>getMatchableAccounts("up")}>Uttar Pradesh</strong>
            </div>
            <div className="category p-3 py-4">
              <strong onClick={()=>getMatchableAccounts("udaipur")}>Udaipur</strong>
            </div>
          </div>
          <div className="col-md-10 mx-auto mt-3">
              {matchableData.length==0 ? <strong className="text-primary"> No Matches Found </strong>: 
              <div className="container mt-5"><div className="row mt-2">
                  {matchableData.map((item)=>{
                    return (<Card key={item.uid} card={item} />);
                  })}
              </div></div>
               } 
          </div>
        </div>
      </div>
    </>
  );
};

export default CardList;
