const Goat = artifacts.require("QRGoat")

module.exports= function(deployer,accounts){
    deployer.deploy(Goat);
}