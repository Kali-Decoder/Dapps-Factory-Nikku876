const Migrations = artifacts.require("Migrations");

module.exports = function (deployer,_netwrok,accounts) {
  console.log(accounts);
  deployer.deploy(Migrations);
};
