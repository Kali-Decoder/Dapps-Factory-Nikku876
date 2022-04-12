const Escrow = artifacts.require("Escrow");
let escrowContract;

contract("Escrow testing...", (accounts) => {
  beforeEach(async () => {
    escrowContract = await Escrow.deployed();
  });
  it("Show payer , payee ,lawyer and amount ", async () => {
    let payer = await escrowContract.payer();
    let payee = await escrowContract.payee();
    let amount = await escrowContract.amount();
    let lawyer = await escrowContract.lawyer();
    amount = await web3.utils.fromWei(amount, "ether");
    console.log("Payer Address: ", payer);
    console.log("payee Address: ", payee);
    console.log("amount Address: ", amount);
    console.log("lawyer Address: ", lawyer);

    assert.ok(true);
  });

  it("Show Contract Address and Balance ", async () => {
    let bal = await escrowContract.balanceOf();
    bal = await web3.utils.fromWei(bal, "ether");
    assert.ok(bal);
    console.log(bal);
  });

  it("should deposit money in contract ", async () => {
    let bal1 = await escrowContract.balanceOf();

    bal1 = await web3.utils.fromWei(bal1, "ether");

    await escrowContract.deposit({ from: accounts[1], value: 2000 });

    let bal2 = await escrowContract.balanceOf();
    bal2 = await web3.utils.fromWei(bal2, "ether");

    assert.ok(bal2 > bal1);
  });

  it("should release funds from contract to payee ", async () => {
    let payee = await escrowContract.payee();
    let bal1 = await web3.eth.getBalance(payee);
    bal1 = await web3.utils.fromWei(bal1, "ether");

    await escrowContract.release({ from: accounts[0] });

    let bal2 = await web3.eth.getBalance(payee);
    bal2 = await web3.utils.fromWei(bal2, "ether");

    assert.ok(bal2 > bal1);
  });

  it("should no release funds if it is not lawyer ", async () => {
    try {
      await escrowContract.release({ from: accounts[1] });
    } catch (error) {
      console.log(error);
      assert.ok(error);
    }
  });
});
