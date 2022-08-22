const ElectionFactory = artifacts.require("ElectionFactory.sol");
const Election = artifacts.require("Election.sol");
let electionFactory;
let election;

contract("Testing Election Contract", (accounts) => {
  beforeEach(async () => {
    electionFactory = await ElectionFactory.deployed();
    await electionFactory.createElection(
      "neerajchoubisa876@gmail.com",
      "Student of the year",
      "For choosing student of year"
    );

    let electionData = await electionFactory.getDeployedElection(
      "neerajchoubisa876@gmail.com"
    );

    election = await Election.at(electionData.deployedAddress);
  });
  it("SHOULD TEST WHOLE CONTRACT FUNCTIONS ", async () => {
    let obj = {
      electionName: await election.electionName(),
      electionDesc: await election.electionDesc(),
      electionAuthority: await election.electionAuthority(),
      status: await election.status(),
    };
    // adding Candidate .....
    await election.addCandidate(
      "Neeraj Choubisa",
      "NC",
      "www.nikku",
      "neerajchoubisa876@gmail.com"
    );
    await election.addCandidate(
      "Sneha Gupta",
      "SG",
      "www.sneha",
      "snehA345@gmail.com"
    );
    await election.addCandidate(
      "Tanmay Bhatt",
      "TB",
      "www.tanmay",
      "gtanmay654@gmail.com"
    );
    let numCandidates = await election.getNumberCandidates();
    await election.vote(1, "nee@gmail.com", { from: accounts[1] });
    await election.vote(2, "mee@gmail.com", { from: accounts[2] });
    await election.vote(3, "pee@gmail.com", { from: accounts[3] });
    await election.vote(1, "qee@gmail.com", { from: accounts[4] });
    await election.vote(2, "ree@gmail.com", { from: accounts[5] });
    await election.vote(3, "see@gmail.com", { from: accounts[6] });
    await election.vote(2, "tee@gmail.com", { from: accounts[7] });
    await election.vote(2, "uee@gmail.com", { from: accounts[8] });
    await election.vote(1, "vee@gmail.com", { from: accounts[9] });
    let numVoters = await election.getNumberVoters();
    assert.equal(9, numVoters.toNumber());
    assert.equal(3, numCandidates.toNumber());
    let candidateDetail = await election.getCandidateDetail(1);
    let electionDetail = await election.getElectionDetail();
    assert.equal(candidateDetail.id, 1);
    assert.equal(electionDetail[3], true);
    let winner = await election.getWinner({ from: accounts[0] });
    let status = await election.status();
    assert.equal(status, false);
  });
});
