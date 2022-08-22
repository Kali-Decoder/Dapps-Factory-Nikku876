const { expect } = require("chai");
const { ethers } = require("hardhat");
let etherWallet;
let accounts;
beforeEach(async ()=>{

  const EtherWallet = await ethers.getContractFactory("EtherWallet");
  etherWallet = await EtherWallet.deploy();
  await etherWallet.deployed();
})
describe("Ether Wallet", function () {
  it("get balance of contract", async  ()=> {
      let bal = await etherWallet.balanceOf();
      console.log(accounts);
      console.log(bal.toNumber());
  });

  it("Check owner", async  ()=> {
    let owner = await etherWallet.owner();
    console.log(owner);
});

});
