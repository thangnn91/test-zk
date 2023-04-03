import "hardhat-typechain";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
module.exports = {
  defaultNetwork: 'zkPolygonTestnet',
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            "enabled": true,
            "runs": 200
          },
          outputSelection: {
            "*": {
              "*": [
                "evm.bytecode",
                "evm.deployedBytecode",
                "abi"
              ]
            }
          },
          metadata: {
            "useLiteralContent": true
          }
        },
      },
    ],
  },
  networks: {
    zkPolygonTestnet: {
      url: "https://rpc.public.zkevm-test.net/",
      accounts: [process.env.PRIVATE_KEY]
    }
  },

  etherscan: {
    apiKey: {
      zkPolygonTestnet: process.env.API_KEY,
    },
    customChains: [
      {
        network: "zkPolygonTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api/",
          browserURL: "https://testnet-zkevm.polygonscan.com/"
        }
      }
    ]
  },
};

// apiURL: "https://api-testnet-zkevm.polygonscan.com/api/",
// browserURL: "https://testnet-zkevm.polygonscan.com/"
// apiURL: "https://explorer.public.zkevm-test.net/api",
// browserURL: "https://explorer.public.zkevm-test.net/"