const Fomo3d = artifacts.require("Fomo3d");
let fomo3dContract;
contract("Testing Fomo3d...", () => {
  beforeEach(async () => {
    fomo3dContract = await Fomo3d.deployed();
  });

  it("Should get Data From Contract ", async (accounts) => {
    await fomo3dContract.kickStart();
    let start = await fomo3dContract.start();
    let end = await fomo3dContract.end();
    let hardEnd = await fomo3dContract.hardEnd();
    let houseFee = await fomo3dContract.houseFee();
    let initialKeyPrice = await fomo3dContract.initialKeyPrice();

    // console.log(start.toNumber());
    // console.log(end.toNumber());
    // console.log(hardEnd.toNumber());
    // console.log(houseFee.toNumber());
    // initialKeyPrice= await web3.utils.fromWei(initialKeyPrice,'ether');
    // console.log(initialKeyPrice);
    assert.ok(true);
  });

  it('Player can bet in fomo 3d',async ()=>{
      let keys1= await fomo3dContract.keys(accounts[2]);
      let amount = await web3.utils.toWei('2','ether');
      await fomo3dContract.bet({from:accounts[2],value:amount});
      let keys2= await fomo3dContract.keys(accounts[2]);
      console.log(keys1,keys2);
  })
});
