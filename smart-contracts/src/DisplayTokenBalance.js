import { React, useEffect, useState } from "react";
import tokenAbi from "./artifacts/NUSMoneyToken.json";
import bankAbi from "./artifacts/NUSBank.json";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";

export const TokenAddress = "0xa3FEE928EFc09c88ff31B01BD2c6f8b862A04aef";
export const BankAddress = "0x3db5c93C420Cc868d9DAd12067A31b2c69285aD5";

const DEFAULT_NET = 987;
const TokenAmount = "100";

const DisplayTokenBalance = () => {
  //connector, library, chainId, account, activate, deactivate
  const web3reactContext = useWeb3React();
  const [provider, setProvider] = useState(undefined);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState(0);
  const [bankContract, setBankContract] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const toBytes32 = (text) => ethers.utils.formatBytes32String(text);
  // Useful conversion Functions
  // const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32);
  const toWei = (ether) => ethers.utils.parseEther(ether);
  // const toEther = (wei) => ethers.utils.formatEther(wei.toString());
  // const toRound = (num) => Number(num).toFixed(2);

  console.log("account now is:", web3reactContext.account);
  console.log("Bytes32 is:", toBytes32("NUSMoney"));

  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      console.log("I am in init function");
      const signer = await provider.getSigner();
      const bankContract = await new ethers.Contract(
        BankAddress,
        bankAbi.abi,
        signer
      );
      setBankContract(bankContract);

      const contract = new ethers.Contract(
        TokenAddress,
        tokenAbi.abi,
        provider
      );
      contract.symbol().then((val) => setTokenSymbol(val));
      contract
        .balanceOf(web3reactContext.account)
        .then((val) => setBalance(formatEther(val)));
      console.log("Wallet Balance:", balance);
    };
    init();
  }, [web3reactContext.account, balance]);

  const requestTokens = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("Bank Contract", bankContract);
    const transactionHash = await bankContract.sendTokens(
      toWei(TokenAmount),
      toBytes32(tokenSymbol)
    );
    console.log(`Loading - ${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`Success - ${transactionHash.hash}`);

    setLoading(false);
    setBalance(balance);

    window.location.reload();
  };

  const switchNetwork = async () => {
    try {
      console.log("chain id", `0x${Number(DEFAULT_NET).toString(16)}`);
      await web3reactContext.library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(DEFAULT_NET).toString(16)}` }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await web3reactContext.library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(DEFAULT_NET).toString(16)}`,
                rpcUrls: ["http://127.0.0.1:8545/"],
                chainName: "Kittens Testnet",
                nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
                blockExplorerUrls: ["https://"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      {web3reactContext.active && web3reactContext.chainId !== DEFAULT_NET ? (
        <Button onClick={switchNetwork} variant="contained" color="primary">
          Switch to Kittens Testnet
        </Button>
      ) : null}
      {web3reactContext.active &&
      balance > 0 &&
      web3reactContext.chainId === DEFAULT_NET ? (
        <h3>
          Balance: {balance} {tokenSymbol}
        </h3>
      ) : (
        <></>
      )}
      {web3reactContext.active && web3reactContext.chainId === DEFAULT_NET ? (
        <div>
          <Button
            onClick={requestTokens}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Request for $NUSMoney
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayTokenBalance;
