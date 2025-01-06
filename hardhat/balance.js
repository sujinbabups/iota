const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.JsonRpcProvider("https://json-rpc.evm.testnet.shimmer.network");

  // Replace with your wallet address
  const address = "0x70388FCD9848d1401C67172a7de2F22c9CC169F4";

  const balance = await provider.getBalance(address);
  console.log("Balance:", ethers.formatEther(balance), "SMR");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
