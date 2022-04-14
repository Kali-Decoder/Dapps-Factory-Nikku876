import React from "react";
import Number from "./Number";
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const handleClick = () => {
  console.log("object");
};
const App = () => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12 col-12 col-xs-10 mx-auto">
          <h4 className="text-center">
            {" "}
            Welcome To Dharwad Online REthereum Based Casino
          </h4>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Number Of Bets : 4</th>
              </tr>
              <tr>
                <th scope="row">Minimum Betting Fees : 100 wei</th>
              </tr>
              <tr>
                <th scope="row">Total Amount In Contract : 100</th>
              </tr>
              <tr>
                <th scope="row">Maximum Number Of Bets : 100</th>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-center">Vote For Your Lucky Number</h4>
        <div className="col-md-12 col-12 col-xs-12 mx-auto d-flex justify-content-between mt-4">
          
          {array.map((item) => {
            return <Number key={item} number={item} onClick={handleClick} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
