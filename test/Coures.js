const { assert, Assertion, expect } = require("chai");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var Course = artifacts.require("./Course.sol");

chai.use(chaiAsPromised);

contract("Course", ([deployer, author, tipper]) => {
  describe("Initialization", async () => {
    let masterContractInstance;

    before(async () => {
      masterContractInstance = await Course.deployed();
    });

    it("Name", async () => {
      let name = await masterContractInstance._name();
      assert.equal("Dogecation", name);
    });

    it("Admin address", async () => {
      let admin = await masterContractInstance.admin();
      assert.equal(admin, deployer);
    });

    it("Initial NFT count", async () => {
      let count = await masterContractInstance._tokenCount();
      assert.equal(1, count);
    });
  });

  describe("Minting", async () => {
    let masterContractInstance;

    before(async () => {
      masterContractInstance = await Course.deployed();
    });

    it("Mint", async () => {
      let mintEvent = await masterContractInstance.mint(deployer, 1);
      const mintEventResult = mintEvent.logs[0].args;
      assert.equal(mintEventResult.tokenId, 1);
      assert.equal(mintEventResult.to, deployer);
    });

    it("Check owners mapping", async () => {
      let owner = await masterContractInstance._owners(1);
      assert.equal(owner, deployer);
    });

    it("OwnerOf function", async () => {
      let owner = await masterContractInstance.ownerOf(1);
      assert.equal(owner, deployer);
    });
  });
});
