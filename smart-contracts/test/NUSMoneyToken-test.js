const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NUSMoney Test Case", function () {
  let nusmoney;
  let owner;
  let another;
  let thirdperson;

  beforeEach(async function () {
    const NUSMoney = await hre.ethers.getContractFactory("NUSMoneyToken");
    nusmoney = await NUSMoney.deploy();
    await nusmoney.deployed();

    [owner, another, thirdperson] = await ethers.getSigners();
  });

  it("Should be successfully deployed", async function () {
    console.log("Success!");
  });

  it("Should deploy with 2m of supply for the owner of the contract", async function () {
    const balance = await nusmoney.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance) === 2000000);
  });

  it("Should let you send tokens to another address", async function () {
    await nusmoney.transfer(another.address, ethers.utils.parseEther("100"));
    expect(await nusmoney.balanceOf(another.address)).to.equal(
      ethers.utils.parseEther("100")
    );
  });

  it("Should let you give annother address the approval to send on your behalf", async function () {
    await nusmoney
      .connect(another)
      .approve(owner.address, ethers.utils.parseEther("1000"));
    // transfer 1000 tokens so that there are sufficient balance
    await nusmoney.transfer(another.address, ethers.utils.parseEther("1000"));
    await nusmoney.transferFrom(
      another.address,
      thirdperson.address,
      ethers.utils.parseEther("1000")
    );
    expect(await nusmoney.balanceOf(thirdperson.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
  });
});
