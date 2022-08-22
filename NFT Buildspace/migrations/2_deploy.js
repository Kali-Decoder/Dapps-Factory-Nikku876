const MyNft= artifacts.require("MyNft");
module.exports= function(deployer){
    deployer.deploy(MyNft);
    
}
