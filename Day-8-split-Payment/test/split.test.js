const SplitPayment = artifacts.require('SplitPayment');
let assert= require("assert");

let splitPayment;
let accounts;
contract('Testing Contract',(accounts)=>{
    beforeEach(async ()=>{
        accounts=accounts;
        splitPayment= await SplitPayment.deployed();

    });

    it("Should Get Owner",async ()=>{
        let owner= await splitPayment.owner();
        assert.equal(accounts[0],owner);
    });

    it("Should divide balances between ",async()=>{
        let acc= [accounts[0],accounts[1],accounts[2]];
        let bal= [40,30,20];
        await splitPayment.splitPayment( acc,
            bal,
            {from: accounts[0], value: 90} );
    })

})