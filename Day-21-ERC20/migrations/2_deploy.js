const ERC20 = artifacts.require("ERC20");

module.exports = function (deployer,_network,accounts) {
  deployer.deploy(ERC20,"Signal","SNL",500000,18);
};
