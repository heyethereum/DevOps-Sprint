const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello Kitties!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello Kitties!");

    const setGreetingTx = await greeter.setGreeting("Baby Kittens!");

    // wait until the transction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Baby Kittens!");
  });
});
