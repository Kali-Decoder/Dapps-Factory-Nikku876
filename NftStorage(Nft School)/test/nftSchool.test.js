const NFTSchool=  artifacts.require("NFTBuilder");
let nftContract;
let main = require("../upload");
// console.log(main);
contract("Testing NFT School Contract ...",(accounts)=>{
    beforeEach(async ()=>{
        nftContract= await NFTSchool.deployed();
        // console.log(nftContract);
    });

    it('Name and symbol ',async ()=>{
        const name = await nftContract.name();
        const symbol= await nftContract.symbol();
        const admin = await nftContract.admin();

        assert.equal(name,"Beena");
        assert.equal(symbol,"NBC");
        assert.equal(admin,accounts[0]);
    })
    it('Should mint your nft ',async ()=>{
        let metaData= new Object();
        metaData.id="1";
        metaData.name="Neeraj choubisa";
        metaData.description="Hello my name is neeraj choubisa , how are you";
        

        let tx= await main(metaData);
        
        
       
        const x= await nftContract.mintToken(tx.url);

        let metaData1= new Object();
        metaData1.id="2";
        metaData1.name="Yashu choubisa";
        metaData1.description="Hello my name is Yashu choubisa , how are you";
        

        let tx1= await main(metaData1);
        
        const y= await nftContract.mintToken(tx1.url);
        assert.ok(x);
        

    });

    it('get address of nft id ',async ()=>{
        const idAddress = await nftContract.ownerOf(0);
        console.log(idAddress);
    })
    it('Should get the balance of owner',async ()=>{
        const idAddress = await nftContract.ownerOf(0);
        const balance = await nftContract.balanceOf(idAddress);
        console.log(balance.toNumber());// Number of nfts hold 
        // console.log(nftContract.methods);
    })
    it('Should transfer owner from to _to',async ()=>{
        const owner= await nftContract.ownerOf(0);
        const tx = await  nftContract.safeTransferFrom(owner,accounts[2],0);
        const ownerNext= await nftContract.ownerOf(0);
        assert.equal(accounts[2],ownerNext); 
    });

    it('Should get nft ',async ()=>{
       let x= await nftContract.tokenURI(0);
       console.log(x);
    })
})