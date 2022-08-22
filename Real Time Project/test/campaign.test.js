const Web3 = require("web3");
const ganache = require("ganache-cli");
const contractCampaign = require("../ethereum/build/Campaign.json");
const contractFactory = require("../ethereum/build/CampaignFactory.json");
const web3 = new Web3(ganache.provider());
const assert = require("assert");
let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(contractFactory.interface))
    .deploy({ data: contractFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" }); //100-> is minmium amount

  [campaignAddress] = await factory.methods.getDeployedCampains().call();

  campaign = await new web3.eth.Contract(
    JSON.parse(contractCampaign.interface),
    campaignAddress
  );
});
describe("Testing...", () => {
  it("Deploy Campaign and Factory ", async () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("marks the createCamapaign is done by manager ", async () => {
      const manager = await campaign.methods.manager().call();
      assert.equal(manager, accounts[0]);
  });
  it("allows people to contribute money and marks as approvers ", async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: "200" });
      const isContributer= await campaign.methods.approvers(accounts[1]).call();
      console.log(isContributer);
      assert.ok(isContributer);
  });
  it("requires minimum contribution", async () => {
     try {
        // const minimumContribution = await campaign.methods.minimumContribution().call();
        await campaign.methods.contribute().send({from:accounts[1],value:'50'});
        assert(false);
     } catch (error) {
         assert(error);
     }

  });



  it("allows to manager to make a  payment reqest", async () => {
      await campaign.methods.createRequest('For Volley Ball PlayGround','100',accounts[1]).send({from:accounts[0],gas:'1000000'});
      const array= await campaign.methods.requests(0).call();
    //   console.log(array);
      assert.equal(accounts[1],array.recipient);
  });
  it("process requests", async () => {
      await campaign.methods.contribute().send({from:accounts[0],value: web3.utils.toWei('10','ether')});
      await campaign.methods.createRequest('For Volley Ball PlayGround',web3.utils.toWei('5','ether'),accounts[1]).send({from:accounts[0],gas:'1000000'});

      await campaign.methods.approveRequest(0).send({from:accounts[0],gas:'1000000'});
      await campaign.methods.finalizeRequest(0).send({from:accounts[0],gas:'1000000'});
      let bal= await web3.eth.getBalance(accounts[1]);
      bal = parseFloat(web3.utils.fromWei(bal,'ether'));
      console.log(bal);
      assert(bal>104);

  });

});
