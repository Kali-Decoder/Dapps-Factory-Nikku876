import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Eventprovider } from "./context/Context";
ReactDOM.render(
  <Eventprovider>
    <App />
  </Eventprovider>,
  document.getElementById("root")
);
