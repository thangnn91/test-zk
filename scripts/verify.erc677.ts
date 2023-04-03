import { ethers, run } from 'hardhat';
import constants from '../constants';
export default async function main(): Promise<string> {
    console.log("start verify contract");
    try {
        await run("verify:verify", {
            address: "0x402543F0e695913838b57620d4A872497085Fce0",
            constructorArguments: [constants.LinkERC677.name, constants.LinkERC677.symbol],
        });
    } catch (error) {
        console.log("Error verify contract", error);
    }
    return "0x402543F0e695913838b57620d4A872497085Fce0";
}

if (require.main === module) {
    main();
}
