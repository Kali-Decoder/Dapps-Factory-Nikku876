import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {WalletContextProvider} from './utils/WalletCotext';
ReactDOM.render(
  <WalletContextProvider>
    <App />
  </WalletContextProvider>,
  document.getElementById("root")
);
