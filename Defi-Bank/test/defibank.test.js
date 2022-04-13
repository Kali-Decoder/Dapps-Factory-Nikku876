const assert= require('assert');
const Web3 =require('web3');
const {interface,bytecode}= require('../compile');
const ganache= require('ganache-cli');
const web3= new Web3(ganache.provider());

let accounts;
let DefiBank;

beforeEach(async()=>{
    accounts= await web3.eth.getAccounts();

    DefiBank=await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode}).send({from:accounts[0],gas:'1000000'});

})

describe('Describing Defi-Contract',()=>{
    it('should check for  manager ',async()=>{
        const manager= await DefiBank.methods.bankOwner().call();

        assert.equal(manager,accounts[0]);
    })
    it("Should set bank name ",async()=>{
        await DefiBank.methods.setBankName("Supreme Bank").send({from:accounts[0],gas:'1000000'});

        const bankName= await DefiBank.methods.bankName().call();
        assert.equal(bankName,"Supreme Bank");
    });

    it('should check Deposit Money and Customer balance',async()=>{
        let x=web3.utils.toWei("4",'ether')

        // console.log(x);
        await DefiBank.methods.depositMoney(x).send({from:accounts[0],gas:'1000000'});
        let  bal2= await DefiBank.methods.getCustomerBalance().call();
        bal2= web3.utils.fromWei(bal2,'ether');
        
        assert.ok(bal2,4);
    });

    it('Should check withdrawl function ',async ()=>{
        let x= web3.utils.toWei("4",'ether')
        await DefiBank.methods.depositMoney(x).send({from:accounts[0],gas:'1000000'});
        let  bal1= await DefiBank.methods.getCustomerBalance().call();
        x=web3.utils.toWei("2",'ether');

        await DefiBank.methods.withdrawlMoney(accounts[1],x).send({from:accounts[0],gas:'1000000'});

        let  bal2= await DefiBank.methods.getCustomerBalance().call();
        console.log(bal2,bal1);
        assert.ok(bal2<bal1);
    })
})