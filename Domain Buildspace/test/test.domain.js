const Domains = artifacts.require("Domains");
let domainContract;
contract("Testing Domains Contract", (accounts) => {
  beforeEach(async () => {
    domainContract = await Domains.deployed();
    console.log(domainContract.address);
  });
  it("Register A domain and get domain owner address  ", async () => {
    // let price = await domainContract.calcPrice("Nextjs");
    // console.log(price);
    let x = await web3.utils.toWei("0.1", "ether");
    let y = await web3.utils.toWei("0.3", "ether");

     await domainContract.register("tanmay","My name is tanmay and i am the owner of this domain ", {
      from: accounts[2],
      value: x,
    });

    const tx= await domainContract.register("Nikk","My name is neeraj choubisa and i am the owner of this domain ", {
      from: accounts[4],
      value: y,
    });

    // let owner = await domainContract.getDomainAddress("mortal");
    // console.log("Owner of mortal Domain :", owner);
    let contractBalance = await web3.eth.getBalance(domainContract.address);
    console.log("Contract Balance", contractBalance);
    // let uri = await domainContract.uri();
    // uri = JSON.parse(uri);
    
    let detail1= {
       name : await domainContract.name(),
       symbol: await domainContract.symbol(),
       tld: await domainContract.tld(),
       token: await domainContract.tokenURI(0),
       owner: await domainContract.ownerOf(0),
    }
    let detail2= {
      
      token: await domainContract.tokenURI(1),
      owner: await domainContract.ownerOf(1),
   }
    
    console.log(detail1);
    console.log(detail2);
    // console.log(tx)
  });
});
