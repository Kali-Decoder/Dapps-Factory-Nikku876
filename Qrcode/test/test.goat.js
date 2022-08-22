const Goat = artifacts.require("QRGoat");
let goatContract;
contract("Testing Smart Contract...", (accounts) => {
  beforeEach(async () => {
    goatContract = await Goat.deployed();
  });

  it("Should give owner", async () => {
    let x = await goatContract.admin();
    assert.equal(accounts[0], x);
  });

  it("Should add your dark websites ", async () => {
    let x = await goatContract.basefees();
    x = await web3.utils.fromWei(x, "wei");

    let tx = await goatContract.addYourDarkWebsite("Www.google.com", {
      from: accounts[2],
      value: x,
      gas: "1000000",
    });
  });
  it("Should give total dark websites and baseFeec ", async () => {
    let x = await goatContract.totalWebsites();
    assert.equal(x.toNumber(), 1);
  });
  it("Should return string webiste ", async () => {
    let x = await goatContract.getWebiste({ from: accounts[2] });
    assert.equal("Www.google.com", x);
  });

  it("Should delete website from container", async () => {
    let x = await goatContract.eraseDarkWeb({ from: accounts[2] });
    console.log(x);
  });

  it("Should return string webiste ", async () => {
    let x = await goatContract.getWebiste({ from: accounts[2] });
    assert.equal("", x);
    
  });
});
