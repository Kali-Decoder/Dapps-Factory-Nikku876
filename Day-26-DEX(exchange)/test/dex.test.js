const Dex = artifacts.require("DEX.sol");

//These Are Four Tokens Which would be added to DEX smart contracts
const Bat = artifacts.require("Tokens/Bat.sol");
const Dai = artifacts.require("Tokens/Dai.sol");
const Zrx = artifacts.require("Tokens/Zrx.sol");
const Mem = artifacts.require("Tokens/Mem.sol");

const Side = {
  BUY: 0,
  SELL: 1,
};

contract("DEX Testing...", (accounts) => {
  let dex, dai, bat, zrx, mem;
  const [trade1, trade2] = [accounts[0], accounts[2]];
  const [DAI, BAT, MEM, ZRX] = ["DAI", "BAT", "MEM", "ZRX"].map((ticker) => web3.utils.fromAscii(ticker));

  beforeEach(async () => {
    [dai, bat, zrx, mem] = await Promise.all([
      Dai.new(),
      Bat.new(),
      Zrx.new(),
      Mem.new(),
    ]);
    dex = await Dex.new();
    // by new function we also deployed a contract
    // at this we calling dex contract addtoken function to add some tokens 
    await Promise.all([
      dex.addToken(DAI, dai.address),
      dex.addToken(BAT, bat.address),
      dex.addToken(MEM, mem.address),
      dex.addToken(ZRX, zrx.address),
    ]);

    const amount =await web3.utils.toWei('1000');
    const seedTokenBalance = async (token, trader) => {
        await token.faucet(trader, amount)
        await token.approve(
          dex.address, 
          amount, 
          {from: trader}
        );
      };
      await Promise.all(
        [dai, bat, zrx, mem].map(
          token => seedTokenBalance(token, trader1) 
        )
      );
      await Promise.all(
        [dai, bat, zrx, mem].map(
          token => seedTokenBalance(token, trader2) 
        )
      );
    });
  
  

  it("Should addToken",async  () => {
      let array =await  dex.tokenList(0);
      assert.equal(array,DAI);
  });
});
