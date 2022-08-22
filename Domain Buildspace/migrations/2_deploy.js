const Domains = artifacts.require("Domains");
module.exports=function(deployer){
    deployer.deploy(Domains,"Heat");
}