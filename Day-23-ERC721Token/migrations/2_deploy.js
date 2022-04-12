const ERC721 = artifacts.require("ERC721Token");

module.exports = function (deployer) {
  deployer.deploy(ERC721);
};
