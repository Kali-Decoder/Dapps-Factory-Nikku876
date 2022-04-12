const ERC20= artifacts.require('ERC20');
let ercContract;
contract('ERC20 Testing ...',(accounts)=>{
    beforeEach(async ()=>{
        ercContract= await ERC20.deployed();
    })

    it('Should give data of ERC TOKEN',async ()=>{
        let name= await ercContract.name();
        let symbol= await ercContract.symbol();
        let decimal= await ercContract.decimals();
        let totalSupply= await ercContract.totalSupply();

        console.log(name,symbol,decimal,totalSupply);
    });

    it('Transfer Tokens',async ()=>{
        let x=await ercContract.transfer(accounts[1],500);
        let y= await ercContract.balances(accounts[1]);
       

        assert.equal(y,500);
    });
    it('should approve spender to spend tokens ',async ()=>{
        await ercContract.approve(accounts[2],300,{from:accounts[1],gas:'1000000'});
        let y = await ercContract.allowance(accounts[1],accounts[2]);
        assert.equal(y,300);

    })
    it('Should transfer tokens from one account to another account ',async ()=>{
        await ercContract.transferFrom(accounts[1],accounts[3],150,{from:accounts[2],gas:'1000000'});
        let y = await ercContract.allowance(accounts[1],accounts[2]);
        assert.equal(y,50);
    })
})

