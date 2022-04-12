const Deed = artifacts.require("Deed");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Deed);
  //all thest arguemnets are of constructor

  //sendong 100 wei to contract by value
};
