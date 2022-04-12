const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
let web3;
let accounts;
let inbox;
const { interface, bytecode } = require("../compile");
beforeEach(async () => {
  web3 = new Web3(ganache.provider());
  accounts = await web3.eth.getAccounts();

  //Deplouying a contract using a account of ganache
  //hello world is an arguement for constructor 
   inbox= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello World"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Testing Smart Contract", () => {
  it("Deploys a contract", () => {
        assert.ok(inbox.options.address);
  });
  it("can test Message ",async ()=>{
        const message= await inbox.methods.message().call();
        assert.equal(message,'Hello World');
  })
  it('can change message',async()=>{
        await inbox.methods.setMessage('Neeraj').send({from:accounts[0]});
        const message= await inbox.methods.message().call();
        assert.equal(message,'Neeraj');
  })
});
