import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {TransactionProvider} from './components/ContextTransaction';
ReactDOM.render(<TransactionProvider><App /></TransactionProvider>, document.getElementById("root"));
