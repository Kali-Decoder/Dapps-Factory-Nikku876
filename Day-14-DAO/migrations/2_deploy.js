const DAO = artifacts.require("DAO");

module.exports = function (deployer,_network,accounts) {
  deployer.deploy(DAO,2*60*60,30,66);
};
