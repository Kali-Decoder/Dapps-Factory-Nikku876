const Escrow = artifacts.require("Escrow");

module.exports = function (deployer,_network,accounts) {

    // constructor(address _payer,address _payee,uint _amount){
        
    // }
  deployer.deploy(Escrow,accounts[1],accounts[2],2000);
};
