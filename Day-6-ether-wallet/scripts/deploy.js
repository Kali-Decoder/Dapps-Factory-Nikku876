
const hre = require("hardhat");
const {ethers} = require('ethers');
async function main() {
  
  const EtherWallet= await hre.ethers.getContractFactory("EtherWallet");
  const etherWallet= await EtherWallet.deploy();
  await etherWallet.deployed();
  console.log("EtherWallet deployed to:", etherWallet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
