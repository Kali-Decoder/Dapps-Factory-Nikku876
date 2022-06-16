import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {TinderProvider} from './context/Tinder';
ReactDOM.render(<TinderProvider><App /></TinderProvider>, document.getElementById("root"));
