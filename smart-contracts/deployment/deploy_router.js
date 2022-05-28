async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Router = await ethers.getContractFactory("DMMRouter02");
  const router = await Router.deploy(
    "0xB61271d05D13A29e6379E18D533f6c1B110d46Db", // mumbai factory address
    "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" // mumbai weth address
  );

  console.log("Router address:", router.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
// factory ropsten: 0xEe65e3A6946D42735C81d119aD562c427eA1bc54
// router ropsten: 0xcF9bf955EA2d6F1605Bf47aC41abFdafA0ba7297
// WETH ropsten: 0xc778417E063141139Fce010982780140Aa0cD5Ab

// factory mumbai: 0xB61271d05D13A29e6379E18D533f6c1B110d46Db
// router mumbai: 0x0857E61EBf8748d55941b2565aC00D1AB87A71d7
//WETH mumbai: 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889
