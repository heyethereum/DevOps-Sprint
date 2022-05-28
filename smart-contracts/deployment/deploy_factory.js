// ropsten factory address: 0xEe65e3A6946D42735C81d119aD562c427eA1bc54
// mumbai factory address: 0xB61271d05D13A29e6379E18D533f6c1B110d46Db

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Factory = await ethers.getContractFactory("DMMFactory");
  const factory = await Factory.deploy(
    "0x35C7C18B854684C2ea522B0e052be0aC1FBc42b5"
  );

  console.log("Factory address:", factory.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
