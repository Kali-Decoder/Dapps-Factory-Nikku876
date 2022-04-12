import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {MarketProvider} from './context/Context';
ReactDOM.render(<MarketProvider><App /></MarketProvider>, document.getElementById("root"));
