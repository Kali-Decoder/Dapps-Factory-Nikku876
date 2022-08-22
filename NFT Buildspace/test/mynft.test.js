const MyNft = artifacts.require("MyNft");
let contractMynft;

contract("Testing smart contract by mocha and chai library ", (accounts) => {
  beforeEach(async () => {
    contractMynft = await MyNft.deployed();
  });

  it("Should testing ", async () => {
    console.log(contractMynft.address);
    let txn1 = await contractMynft.makeAnEpicNft({
      form: accounts[0],
      gas: "1000000",
    });

    console.log(
      "First Nft is deployed to this hash :",
      txn1.tx,
      "Deployed by account :",
      accounts[0]
    );

    let txn2 = await contractMynft.makeAnEpicNft({
      form: accounts[2],
      gas: "1000000",
    });

    console.log(
      "Second Nft is deployed to this hash :",
      txn2.tx,
      "Deployed by account :",
      accounts[2]
    );
  });
  it("Should show name and token symbol ", async () => {
    let x = await contractMynft.name();
    let y = await contractMynft.symbol();

    console.log(x, y);
  });
});
