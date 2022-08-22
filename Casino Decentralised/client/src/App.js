import React, { useState, useEffect } from "react";
import { getWeb3 } from "./web3";
import { getContract } from "./Contract";
const App = () => {
  const [timer, setTimer] = useState(0);
  const [lastWinner, setLastWinner] = useState("0x...");
  const [minimumBet, setMinimumBet] = useState(0);
  const [totalBet, setTotalBet] = useState(0);
  const [numberOfBets, setNumberOfBets] = useState(0);
  const [maxAmountOfBets, setMaxAmountOfBets] = useState(0);
  const [data, setData] = useState(null);
  const [casinoContract, setCasinoContract] = useState(null);
  const getDetail = async () => {
    try {
      let minBet = await casinoContract.methods.minimumBet();
      setMinimumBet(minBet);
      let totalBet = await casinoContract.methods.totalBet();
      setNumberOfBets(totalBet);

      let bets = await casinoContract.methods.setNumber;
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setData(e.target.value);
  };
  useEffect(async () => {
    let contract = await getContract();
    setCasinoContract(contract);
    console.log(casinoContract);
  }, []);
  const voteNumber = (number) => {
    console.log(number);
  };
  return (
    <>
      <div className="row text-white">
        <div className="col-md-12 bg-dark text-center">
          <h6 className="text-center">
            Start Curating Projects From The Polygon Chain{" "}
            <i class="fa-solid fa-fire"></i>{" "}
            <i class="fa-solid fa-hexagon text-white"></i>
          </h6>
        </div>
      </div>

      <div className="main-container">
        <div className="block">
          <b>Number of bets:</b> &nbsp;
          <span>{numberOfBets}</span>
        </div>
        <div className="block">
          <b>Last number winner:</b> &nbsp;
          <span>{lastWinner}</span>
        </div>
        <div className="block">
          <b>Total ether bet:</b> &nbsp;
          <span>{totalBet} ether</span>
        </div>
        <div className="block">
          <b>Minimum bet:</b> &nbsp;
          <span>{minimumBet} ether</span>
        </div>
        <div className="block">
          <b>Max amount of bets:</b> &nbsp;
          <span>{maxAmountOfBets} ether</span>
        </div>
        <hr />
        <h1>Bet for your best number and win huge amounts of Ether</h1>
        <input
          type="number"
          placeholder="Enter Amount In Wei"
          name="data"
          value={data}
          onChange={(e) => {
            onChange(e);
          }}
          className="form-control"
        />
        <br />
        <div className="block">
          <h4>Timer:</h4> &nbsp;
          <span> {timer}</span>
        </div>
        <div className="block">
          <h4>Last winner:</h4> &nbsp;
          <span>{lastWinner}</span>
        </div>
        <hr />
        <h2>Vote for the next number</h2>
        <ul>
          <li
            onClick={() => {
              voteNumber(1);
            }}
          >
            1
          </li>
          <li
            onClick={() => {
              voteNumber(2);
            }}
          >
            2
          </li>
          <li
            onClick={() => {
              voteNumber(3);
            }}
          >
            3
          </li>
          <li
            onClick={() => {
              voteNumber(4);
            }}
          >
            4
          </li>
          <li
            onClick={() => {
              voteNumber(5);
            }}
          >
            5
          </li>
          <li
            onClick={() => {
              voteNumber(6);
            }}
          >
            6
          </li>
          <li
            onClick={() => {
              voteNumber(7);
            }}
          >
            7
          </li>
          <li
            onClick={() => {
              voteNumber(8);
            }}
          >
            8
          </li>
          <li
            onClick={() => {
              voteNumber(9);
            }}
          >
            9
          </li>
          <li
            onClick={() => {
              voteNumber(10);
            }}
          >
            10
          </li>
        </ul>
      </div>
    </>
  );
};

export default App;
