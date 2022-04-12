const ICO = artifacts.require("ICO");

module.exports = function (deployer) {
  deployer.deploy(ICO,"Signal","SNL",18,'1000');
};