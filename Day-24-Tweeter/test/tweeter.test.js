const Tweeter = artifacts.require("Tweeter");
let tweeterContract;
contract('Testing Tweeter ...',(accounts)=>{
    beforeEach(async()=>{
        tweeterContract= await Tweeter.deployed();
    });

    it('Should Post A Tweet',async ()=>{
        await tweeterContract.createTweet("Jai Shree Ram ... People get everythong in their Dreams,But some people get their Dreams in day ... ",{from:accounts[9]});
        const array = await tweeterContract.getListTweets(1);
        assert.equal(array[0].description,"Jai Shree Ram ... People get everythong in their Dreams,But some people get their Dreams in day ... ");
    });

    it('should send Messages',async()=>{
        await tweeterContract.textMessage("Hello Brother How Are You",accounts[0],accounts[1]);
        
    })
    it('Should follow ',async ()=>{
        await tweeterContract.follow(accounts[2]);
    })

    
})
