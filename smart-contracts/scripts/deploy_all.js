require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { ethers } = require("ethers");
var fs = require("fs");
const util = require("util");
var ethers1 = require("ethers");
const fsPromises = fs.promises;

// the path to the contract ABI
const NUSMONEY_ABI_FILE_PATH =
  "artifacts/contracts/NUSMoneyToken.sol/NUSMoneyToken.json";
const NUSBANK_ABI_FILE_PATH = "artifacts/contracts/NUSBank.sol/NUSBank.json";
// the address from the deployed smart contract
var NUSMONEY_CONTRACT_ADDRESS = "0xCb76B1948F65132F2e52eD681FD26935c9E206F2";
var NUSBANK_CONTRACT_ADDRESS = "0x32c2c15399aAD0deE331E2DD283a2cF4EA6CEAE0";

const SYMBOL32B =
  "0x4e55534d6f6e6579000000000000000000000000000000000000000000000000";

//load ABI from build artifacts
async function getABI(file_path) {
  const data = await fsPromises.readFile(file_path, "utf8");
  const abi = JSON.parse(data)["abi"];
  //console.log(abi);
  return abi;
}

async function main() {
  let provider = ethers1.getDefaultProvider("http://127.0.0.1:8545");
  const nusmoney_abi = await getABI(NUSMONEY_ABI_FILE_PATH);
  const nusbank_abi = await getABI(NUSBANK_ABI_FILE_PATH);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello Kitties");

  console.log("Token address:", greeter.address);

  // READ-only operations require only a provider
  // Providers allow only for read operations
  // let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
  // const greeting = await contract.greet();
  // console.log(greeting);

  const { SECRET1 } = process.env;
  let signer = new ethers1.Wallet(SECRET1, provider);

  const nusmoney_contract = new ethers.Contract(
    NUSMONEY_CONTRACT_ADDRESS,
    nusmoney_abi,
    signer
  );
  const nusbank_contract = new ethers.Contract(
    NUSBANK_CONTRACT_ADDRESS,
    nusbank_abi,
    signer
  );
  let tx = await nusmoney_contract.approve(
    "0x32c2c15399aAD0deE331E2DD283a2cF4EA6CEAE0",
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
  await tx.wait();

  let tx1 = await nusbank_contract.whitelistToken(
    SYMBOL32B,
    NUSMONEY_CONTRACT_ADDRESS
  );
  await tx1.wait();

  tx1 = await nusbank_contract.depositTokens(
    "1000000000000000000000",
    SYMBOL32B
  );
  const updated_balance = await nusmoney_contract.balanceOf(
    NUSBANK_CONTRACT_ADDRESS
  );
  console.log(updated_balance);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
