const Voting = artifacts.require("Voting");
let votingContract;
contract("Voting Testing ...", (accounts) => {
  beforeEach(async () => {
    votingContract = await Voting.deployed();
  });

  it("Should give owner address ", async () => {
    let owner = await votingContract.owner();
    assert.ok(owner);
  });

  it("Should register Candidate", async () => {
    await votingContract.registerCandidate(
      "Neeraj choubisa",
      "BTC",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyAxd7in3qH5oXTfOx-afjdrpXi5ylTCu7Aw&usqp=CAU",
      accounts[3]
    );

    let nextId = await votingContract.nextId();
    assert.equal(nextId.toNumber(), 1);
  });

  it("should not register if caller not owner", async () => {
    try {
      await votingContract.registerCandidate(
        "Neeraj choubisa",
        "BTC",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyAxd7in3qH5oXTfOx-afjdrpXi5ylTCu7Aw&usqp=CAU",
        accounts[1],
        { from: accounts[1] }
      );
      console.log("Helloo");
    } catch (error) {
      assert(error);
    }
  });

  it("should increase vote count ", async () => {
    let x = await votingContract.voting(0, { from: accounts[2] });
    let candidate = await votingContract.candidates(0);
    assert.equal(candidate[4].toNumber(), 1);
  });

  it("Should check double voted ", async () => {
    try {
      let x = await votingContract.voting(0, { from: accounts[2] });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
});
