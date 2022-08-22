const web3 = require("web3");

const EtherWallet = artifacts.require("EtherWallet");
contract("EtherWallet", async (accounts) => {
  let etherwallet = null;
  before(async () => {
    etherwallet = await EtherWallet.deployed();
  });

  it("Should set accounts[0] as owner", async () => {
    const owner = await etherwallet.owner;
    assert(accounts[0] == owner);
  });

//   it("Should deposit ether to ether wallet ", async () => {
//     await etherwallet.deposit({ from: accounts[0], value: 100 });
//     const balance = await web3.eth.getBalance(etherwallet.address);
//     assert(parseInt(balance) == 100);
//   });

  it("Should return balance of wallet ", async () => {
    const balance = await etherwallet.balanceOf();
    assert(parseInt(balance) == 100);
  });

  it("Should transfer ether from one wallet to another wallet ", async () => {
    const beforeBalance = await web3.eth.getBalance(accounts[1]);
    await etherwallet.sendEther(accounts[1], 50, { from: accounts[0] });
    const balanceWallet = await web3.eth.getBalance(etherwallet.address);
    assert(parseInt(balanceWallet) === 50);
    const afterBalance = await web3.eth.getBalance(accounts[1]);
    const finalBalance = web3.utils.toBN(afterBalance);
    const initialBalance = web3.utils.toBN(beforeBalance);
    assert(finalBalance.sub(initialBalance).toNumber() === 50);
  });
  //same account se same account me paise not allowed
  it('Should NOT transfer ether if tx not sent from owner', async () => {
    try {
      await etherwallet.send(accounts[1], 50, {from: accounts[1]});
    } catch(e) {
      assert(('sender is not allowed'));
      return;
    }
    assert(false);
  });
});
