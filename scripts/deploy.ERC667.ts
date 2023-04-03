import { ethers, run } from 'hardhat';
import constants from '../constants';
export default async function main(): Promise<string> {
  console.log('\n[LinkErc677 Contract]');
  const factory = await ethers.getContractFactory('LinkERC677');
  const contract = await factory.deploy(constants.LinkERC677.name, constants.LinkERC677.symbol);
  await contract.deployed();
  console.log("LinkErc677:", contract.address);
  console.log("start verify contract");
  try {
    await run("verify:verify", {
      address: contract.address,
      constructorArguments: [constants.LinkERC677.name, constants.LinkERC677.symbol],
    });
  } catch (error) {
    console.log("Error verify contract", error);
  }
  return contract.address;
}

if (require.main === module) {
  main();
}
