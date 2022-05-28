import { React } from "react";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import ConnectWallet from "./ConnectWallet";

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectWallet />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
