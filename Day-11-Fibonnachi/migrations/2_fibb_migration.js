const Fibb = artifacts.require("Fibb");

module.exports = function (deployer) {
  deployer.deploy(Fibb);
};
