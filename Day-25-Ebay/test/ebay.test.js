const Ebay = artifacts.require("Ebay");

let ebayContract;
let md;
let name;
let baseFee;

contract('Testing Contract ',(accounts)=>{
    beforeEach(async ()=>{
        ebayContract= await Ebay.deployed();
        md= await ebayContract.ManagerDirector();
        name= await ebayContract.name();
        baseFee= await ebayContract.baseFeeOfProduct();
        baseFee= baseFee.toNumber(baseFee);
    })

    it('Should give basic details ',async ()=>{
        console.log("Md :",md);
        console.log("Name :",name);
        console.log("baseFee :",baseFee);
    });
    it('Should Create A Product',async ()=>{
        await ebayContract.createAuction("KaigiYama","Kaigiyama the king of court best Setter",500,2*24*60*60,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwz9Dgpp0TN8jZuQeHkdQM7xPLi6XLOUVEDg&usqp=CAU",{from:accounts[1],value:'100',gas:'1000000'});

    });

    it('Trader can bid a given Product ',async ()=>{
        await ebayContract.createOffer(1,{from:accounts[3],value:'700',gas:'1000000'});

    })

    it('Trader multiple bids  ',async ()=>{
        await ebayContract.createOffer(1,{from:accounts[3],value:'800',gas:'1000000'});
        await ebayContract.createOffer(1,{from:accounts[4],value:'1000',gas:'1000000'});
        await ebayContract.createOffer(1,{from:accounts[5],value:'1200',gas:'1000000'});
        let contractBalance= await web3.eth.getBalance(ebayContract.address);
        console.log(contractBalance);
        
    });


    it('Should declare winner and release all its funds',async ()=>{
        
    })
})