
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const UniSwap = await hre.ethers.getContractFactory("UniSwap");
  const uniSwap = await UniSwap.deploy();

  await uniSwap.deployed();
  console.log(uniSwap)
  console.log("UniSwap deployed to:", uniSwap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
