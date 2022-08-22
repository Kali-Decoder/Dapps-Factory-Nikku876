const CVContract = artifacts.require("CVContract");

module.exports = function (deployer) {
  deployer.deploy(CVContract);
};
