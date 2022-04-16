const Casino = artifacts.require('Casino');
let Casinocontract ;

let owner;

contract('Contract Testing...',(accounts)=>{
    beforeEach(async()=>{
        accounts= await web3.eth.getAccounts();
        Casinocontract= await Casino.deployed();
        owner= await Casinocontract.owner();
    });

    it('Should Get Owner From Contract',async ()=>{
       let owner= await Casinocontract.owner();
       assert.equal(owner,owner);
    });
    it('Should Get Minimum Bet ',async()=>{
        let x= await Casinocontract.minimumBet();
        assert.equal(x,100);
    })
    
    it('Participants Should Bet in casino ',async()=>{
        await Casinocontract.bet(4,{value:100,from:accounts[2],gas:1000000});
        let x= await Casinocontract.playerInfo(accounts[2]);
        let numberSelected= x.numberSelected;
        assert.equal(4,numberSelected);
    });

    it('Should Get Number of  Bet ',async()=>{
        let x= await Casinocontract.numberOfBets();
        assert.equal(x,1);
    })

    it('Should Get Total Bet ',async()=>{
        let x= await Casinocontract.totalBet();
        assert.equal(x,100);
    })

    it('Should Get Max Amount of  Bets ',async()=>{
        let x= await Casinocontract.maxAmountOfBets();
        assert.equal(x,100);
        console.log(Casinocontract.address);
    })

    

    
})