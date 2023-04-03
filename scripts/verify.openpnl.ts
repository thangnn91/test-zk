import { ethers, run } from 'hardhat';
import constants from '../constants';
import Deployed from "../config.json";
import { Configs, Constructors, Settings } from '../test/configs-matic copy';
export default async function main(): Promise<string> {
    console.log("start verify mmtTokenOpenPnlFeed");

    try {
        await run("verify:verify", {
            address: Deployed.zkPolygonTestnet.MMTTokenOpenPnlFeed,
            constructorArguments: [
                Configs.LinkErc677,
                Deployed.zkPolygonTestnet.Vault,
                Constructors.MMTTokenOpenPnlFeed.p3,
                Settings.PairStorage.Groups[0].g[1],
                Constructors.MMTTokenOpenPnlFeed.p5,
            ],
        });
    } catch (error) {
        console.log("Error verify mmtTokenOpenPnlFeed", error);
    }
    return "0x402543F0e695913838b57620d4A872497085Fce0";
}

if (require.main === module) {
    main();
}
