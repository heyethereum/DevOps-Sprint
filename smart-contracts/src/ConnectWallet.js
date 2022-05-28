import { React, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DisplayTokenBalance from "./DisplayTokenBalance";

const ConnectWallet = () => {
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  const [errorMessage, setErrorMsg] = useState("");

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(injected);
  }, []);

  const connectWalletHandler = async () => {
    try {
      await activate(injected);
      window.localStorage.setItem("provider", "injected");
    } catch (error) {
      console.log("I am", error);
      if (error.code === 4001) setErrorMsg("User rejected the request");
    }
  };
  const disconnectWallet = () => {
    deactivate();
  };

  return (
    <div>
      <div>
        <h1>Central Bank of NUS</h1>
        {!active ? (
          <Button
            onClick={connectWalletHandler}
            variant="contained"
            color="primary"
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            onClick={disconnectWallet}
            variant="contained"
            color="primary"
          >
            Disconnect
          </Button>
        )}
        <Typography variant="h4" color="secondary">
          {errorMessage}
        </Typography>
      </div>
      <div>
        {active ? (
          <h3>Connected account : {account}</h3>
        ) : (
          <h3>Not Connected</h3>
        )}
      </div>
      <div>{active && <h3>Network ID: {chainId}</h3>}</div>
      <div>{active && <DisplayTokenBalance />}</div>
    </div>
  );
};

export default ConnectWallet;
