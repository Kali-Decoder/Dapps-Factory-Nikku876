const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    
    deployer.address
  );

  const NickToken = await hre.ethers.getContractFactory("NickToken");
  const nickToken = await NickToken.deploy("NickToken", "NCT");

  await nickToken.deployed();

  console.log("Token deployed to:", nickToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
