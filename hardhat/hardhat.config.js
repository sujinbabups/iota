/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();


module.exports = {
   
  defaultNetwork:"iota",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    infurahol:{
      url:process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
      },
    iota: {
      url: "https://json-rpc.evm.testnet.iotaledger.net",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: "0.8.20",
};