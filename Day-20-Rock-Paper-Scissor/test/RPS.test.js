const RockPaperScissor = artifacts.require("RockPaperScissor");
let rpsContract;
let adminAddress;

contract("Testing RPS Decentralised Game ", async (accounts) => {
  beforeEach(async () => {
    rpsContract = await RockPaperScissor.deployed();
    adminAddress = await rpsContract.admin();
  });

  it("should Create A game ...", async () => {
    await rpsContract.createGame(accounts[2], {
      from: accounts[1],
      value: "1050",
      gas: "1000000",
    });

    let game = await rpsContract.games(0);
    assert.equal(game.state.toNumber(), 0);
  });

  it("player should joined game ", async () => {
    await rpsContract.joinedGame(0, {
      from: accounts[2],
      gas: "1000000",
      value: "1050",
    });
    let game = await rpsContract.games(0);
    assert.equal(game.state.toNumber(), 1);
  });

  it("should commit move ", async () => {
    //1 rock
    //2 paper
    //3 scissor
    await rpsContract.commitMove(0, 1, 10, { from: accounts[2] });
    await rpsContract.commitMove(0, 2, 10, { from: accounts[1] });
    let game = await rpsContract.games(0);
    assert.equal(game.state.toNumber(), 2);
  });

  it("Should Revealed your move ", async () => {
    await rpsContract.revealedMove(0, 1, 10, { from: accounts[2] });
    await rpsContract.revealedMove(0, 2, 10, { from: accounts[1] });
    let game = await rpsContract.games(0);
    assert.equal(game.state.toNumber(), 3);
  });
});
