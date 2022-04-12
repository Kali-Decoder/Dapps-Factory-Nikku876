const assert = require('assert');
const Web3 = require('web3');
const ganache= require('ganache-cli');
const {interface,bytecode}=require('../compile');

let web3 = new Web3(ganache.provider());

let accounts ;
let marketContract;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    marketContract= await new  web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode}).send({from:accounts[0],gas:'1000000'});
});

describe('Testing Market Place Contract...',()=>{
    it('Should check for manager ',async ()=>{
        const manager= await marketContract.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it('Should Write product on blockchain and recieve product by id ',async()=>{
        await marketContract.methods.writeProduct("Barbecue Pizza","https://i.imgur.com/fpiDeFd.png",`Homemade tortilla with your choice of filling, cheese, 
        guacamole salsa with Mexican refried beans and rice`,"Asili - KN 4 St",200).send({from:accounts[0],gas:'1000000'});

        const product = await marketContract.methods.getProduct(0).call();

        assert.equal(product[1],"Barbecue Pizza");
    })

    it('Should get total products from  blockchain',async()=>{
        const idx1=await marketContract.methods.getTotalNumberProducts().call();
        const idx2= await marketContract.methods.idx().call();
        assert.ok(idx1==idx2);
    });

    it('Should buy a product on dapp ',async()=>{
        
        await marketContract.methods.writeProduct("Barbecue Pizza","https://i.imgur.com/fpiDeFd.png",`Homemade tortilla with your choice of filling, cheese, 
        guacamole salsa with Mexican refried beans and rice`,"Asili - KN 4 St",200).send({from:accounts[0],gas:'1000000'});

        const product = await marketContract.methods.getProduct(0).call();

        let sold1= product[6];
        console.log(product);
        
        await marketContract.methods.buyProduct(0).call();

        const product2 = await marketContract.methods.getProduct(0).call();

        let sold2= product2[6];
        console.log(product2);
        // assert.ok(sold2>sold1);
        
    })
})