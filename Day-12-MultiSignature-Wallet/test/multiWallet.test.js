const MultiWallet = artifacts.require("MultiWallet");
let contractMultiWallet;
contract("Testing MultiSignature Contract ...", (accounts) => {
  beforeEach(async () => {
    contractMultiWallet = await MultiWallet.deployed();
  });
  it('should give value of quorum',async ()=>{
      let get = await contractMultiWallet.quorum();
      
      assert.equal(2,get);
  })
  it("Should Check Create Transfer", async () => {
    await contractMultiWallet.createTransfer(3000, accounts[0],{from:accounts[5]});
    let array = await contractMultiWallet.transfers(0);
   
    assert.equal(accounts[0], array[1]);

    //approvers->5,6,7,8
  });

  it(' Should Send Transaction ',async ()=>{

    await contractMultiWallet.sendTransaction(0,{from:accounts[8]});
    let array = await contractMultiWallet.transfers(0);
    console.log(array);
    // await contractMultiWallet.sendTransaction(0);
    // array = await contractMultiWallet.transfers(0);
    // console.log(array[3].toNumber());
    // await contractMultiWallet.sendTransaction(0);
    // array = await contractMultiWallet.transfers(0);
    // console.log(array[3].toNumber());
    // await contractMultiWallet.sendTransaction(0);
    // array = await contractMultiWallet.transfers(0);
    // console.log(array[3].toNumber());

  })
  
});
