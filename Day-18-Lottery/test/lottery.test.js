const Lottery= artifacts.require("Lottery");
let lotteryContract;
contract('Testing Lottery Contract ',(accounts)=>{
    beforeEach(async ()=>{
        lotteryContract=await Lottery.deployed();
    });

    it('Should Give Admin Of Lottery and HouseFee',async ()=>{
        let admin = await lotteryContract.admin();
        let houseFee= await lotteryContract.houseFee();
        assert.ok(admin);
        assert.ok(houseFee);
    });

    it('Should Create Bet Ground By Admin',async()=>{
        await lotteryContract.createBet(5,30);
        let betCount= await lotteryContract.betCount();
        let betSize= await lotteryContract.betSize();
        assert.equal(betCount,5);
        assert.equal(betSize,30);
    })

    it('players should bet in Contract',async ()=>{
        await lotteryContract.bet({from:accounts[1],value:'30'});
        let addr= await lotteryContract.players(0);
        assert.equal(addr,accounts[1]);
    })
    it('Admin Should  cancel the lottery',async ()=>{
        await lotteryContract.cancel();
        let currentState= await lotteryContract.currentState();
        assert.equal(currentState.toNumber(),0);
    })
})