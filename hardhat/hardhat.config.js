/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();


module.exports = {
   
  defaultNetwork:"shimmer",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    infurahol:{
      url:process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
      },
    shimmer: {
      url: "https://json-rpc.evm.testnet.shimmer.network",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: "0.8.20",
};