require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const ALCHEMY_API = process.env.ALCHEMY_HTTP;
const SECRET = process.env.SECRET1;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const POLYGONSCANSCAN_API = process.env.POLYGONSCAN_API;
const SNOWTRACE_API = process.env.SNOWTRACE_API;
const ALCHEMY_HTTP_MUMBAI = process.env.ALCHEMY_HTTP_MUMBAI;

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ropsten: {
      url: `${ALCHEMY_API}`,
      accounts: [`0x${SECRET}`],
    },
    mumbai: {
      url: `${ALCHEMY_HTTP_MUMBAI}`,
      accounts: [`0x${SECRET}`],
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [`0x${SECRET}`],
    },
  },
  etherscan: {
    // apiKey: `${ETHERSCAN_API}`,
    //apiKey: `${POLYGONSCANSCAN_API}`,
    apiKey: `${SNOWTRACE_API}`,
  },
};
