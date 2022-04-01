import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";
import { Web3ReactProvider } from "@web3-react/core";
import {getLibrary} from "./components/wallet/Connectors"

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
