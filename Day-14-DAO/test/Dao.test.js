const DAO = artifacts.require("DAO");
let daoContract;
let admin;
contract('DAO Testing...',async (accounts)=>{
    beforeEach(async ()=>{
        daoContract= await DAO.deployed();
        admin= await daoContract.manager();
    });
    it('should check admin address', ()=>{
        assert.equal(admin,accounts[0]);
    })
    it('Should Contribute Money By Contribute Function ',async ()=>{
        let x1= await daoContract.totalShares();
        x1=x1.toNumber();
        console.log(x1);
        // let money = await web3.utils.toWei(2,'ether');
        await daoContract.contribute({from:accounts[1],value:'2000000000000'});
        let x2= await daoContract.totalShares();
        x2=x2.toNumber();
        console.log(x2);
        assert.ok(x2>x1);
    });
    it('should Create Proposal ',async ()=>{
        await daoContract.createProposal("Purchase Buggati",2000000,accounts[3],{from:accounts[1]});
        let array = await daoContract.proposals(0);
        console.log(array);
        assert.equal(array[1],"Purchase Buggati");
    });

    it('Should Vote For proposal ',async ()=>{
        await daoContract.voteProposal(0,{from:accounts[1]});
        let array = await daoContract.proposals(0);
        assert.ok(array[4]>0);
    });

    it('should Redeem your Share',async()=>{
        let x1 = await daoContract.shares(accounts[1]);
        x1=x1.toNumber();
        await daoContract.redeemShare(2000,{from:accounts[1]});
        let x2 = await daoContract.shares(accounts[2]);
        x2=x2.toNumber();

        assert.ok(x2<x1);

    });

    it('should trnsfer share from one account to other account',async()=>{
        let x1 = await daoContract.shares(accounts[3]);
        x1=x1.toNumber();
        await daoContract.transferShare(2000,accounts[3],{from:accounts[1]});

        let x2 = await daoContract.shares(accounts[3]);
        x2=x2.toNumber();

        assert.ok(x2>x1);
    });
    it('Should execute proposal only Admin Can Prform This',async ()=>{
       let confirm= await daoContract.executeProposal(0,{from:admin});
       assert.ok(confirm);
       //time of contract is over then only it will executed
    })

})