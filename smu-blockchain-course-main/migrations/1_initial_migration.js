var file = artifacts.require("./FileSystem.sol");

module.exports = function(deployer) {
    deployer.deploy(file);
};