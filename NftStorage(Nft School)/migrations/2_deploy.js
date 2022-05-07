const NFTSchool = artifacts.require("NFTBuilder");

module.exports = function (deployer) {
  deployer.deploy(NFTSchool, "Beena", "NBC");
};
