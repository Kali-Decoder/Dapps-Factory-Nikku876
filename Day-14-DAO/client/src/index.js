import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DAOProvider } from "./context/DAOContext";

ReactDOM.render(
  <DAOProvider>
    <App />
  </DAOProvider>,
  document.getElementById("root")
);
