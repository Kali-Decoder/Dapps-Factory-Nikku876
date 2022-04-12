const ICO = artifacts.require("ICO");
const ERC20 = artifacts.require("ERC20");

contract("ICO Testing ", (accounts) => {
  let name = "Signal";
  let symbol = "SNL";
  let decimals = 18;
  let token;
  let icoContract;
  let totalSupply = "1000";
  beforeEach(async () => {
    icoContract = await ICO.new(name, symbol, decimals, totalSupply);

    //ico me erce deploy krega phir voh us conttract address return karegs phir uska hum use krke ERC20 ka instance bnayenge
    let tokenAddress = await icoContract.token();
    token = await ERC20.at(tokenAddress);
  });

  it("Should create an erc20 token", async () => {
    let _name = await token.name();
    let _symbol = await token.symbol();
    let _decimals = await token.decimals();
    let _totalSupply = await token.tS();
    assert.equal(_name, name);
    assert.equal(symbol, _symbol);
  });

  it("Should start Ico ", async () => {
    const duration = 100;
    const price = 1;
    const availableTokens ="100";
    const minPurchase = "10";
    const maxPurchase = "20";
    const start = parseInt(new Date().getTime() / 1000);
    // time.increaseTo(start);
    await icoContract.start(duration,price,minPurchase,maxPurchase,availableTokens);

    const expectedEnd = start + duration;
    const end = await icoContract.end();

    const actualAvailableTokens= await icoContract.availableTokens();
    assert.equal(actualAvailableTokens,availableTokens);
    assert.equal(end,expectedEnd);
  });
});
