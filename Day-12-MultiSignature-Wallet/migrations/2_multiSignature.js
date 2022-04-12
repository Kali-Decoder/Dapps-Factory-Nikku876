const MultiWallet= artifacts.require("MultiWallet")


module.exports=function(deployer,_network,accounts){
    console.log(accounts);
    deployer.deploy(MultiWallet,[accounts[5],accounts[6],accounts[7],accounts[8]],2);
    //quorum is 2 if voters increase from two transaction is successfull 
}