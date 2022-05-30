async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello Kitties");

  console.log("Token address:", greeter.address);
}
// kittens testnet address: 0x0f0df2d4A1aC6cDC49794887EDAdF9105511dE2A
main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
