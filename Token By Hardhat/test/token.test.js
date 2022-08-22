let tokenContract;
beforeEach(async () => {
  let [owner]= await ethers.getSigner()
  console.log(owner);
  const TokenContract = await ethers.getContractFactory("Token");
  tokenContract = await TokenContract.deploy();
});
describe("Token Testing...", async () => {
  it("Should get token name, symbol ,supply ,owner ", async () => {
    console.log(tokenContract);
  });
});
