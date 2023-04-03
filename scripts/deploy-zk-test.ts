import { ethers, hardhatArguments, run, upgrades } from "hardhat";
import { Constructors, Settings, Configs } from "../test/configs-zk-test";
import * as Config from "./config";
import { parseEther } from "@ethersproject/units";
import { sleep } from "../test/helpers";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();
  console.log("deploy from address: ", deployer.address);

  // const lib = await Lib.deploy();
  const chainId = parseInt(process.env.CHAIN_ID!);
  console.log("chainId", chainId);

  //Guide: Transfer link to MTTPriceAggregator, MMTTokenOpenPnlFeed* to get price by via chainlink
  //       deposit dai to MMTTradingVault
  // Staker need approve dai to TradingStorage
  // SC upgradeable: TradingCallback, Vault

  //deploy token

  const DaiToken = await ethers.getContractFactory("mUSDC");
  // const daiToken = await DaiToken.deploy();
  // await daiToken.deployed();
  const daiToken = await DaiToken.attach(
    "0x1C9E04E5b3dECc263d04079d2DE5fB8f5b28908C"
  );
  console.log("daiToken", daiToken.address);
  Config.setConfig(network + ".DaiToken", daiToken.address);

  //deploy childManager
  const ChildChainManager = await ethers.getContractFactory(
    "ChildChainManager"
  );

  //const childChainManager = await ChildChainManager.deploy(); 
  // await childChainManager.deployed();
  // await childChainManager.initialize(deployer.address);
  const childChainManager = await ChildChainManager.attach(
    "0x17d2E220C2Bd074eaA29A3c6DA03B5dA8FFbF8a2"
  );
  console.log("ChildChainManager address: ", childChainManager.address);
  Config.setConfig(network + ".ChildChainManager", childChainManager.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy childManager proxy
  const ChildManagerProxy = await ethers.getContractFactory(
    "ChildChainManagerProxy"
  );

  // const childChainManagerProxy = await ChildManagerProxy.deploy(
  //   childChainManager.address
  // );

  // await childChainManagerProxy.deployed();
  const childChainManagerProxy = await ChildManagerProxy.attach(
    "0x8f286B63398523FB45aEc1524d657B80DdaE27B0"
  );
  console.log("ChildManagerProxy address: ", childChainManagerProxy.address);

  Config.setConfig(
    network + ".ChildManagerProxy",
    childChainManagerProxy.address
  );
  await Config.updateConfig();
  //await sleep(10000);
  //deploy trading storage
  const TradingStorage = await ethers.getContractFactory("MMTTradingStorage");

  // const tradingStorage = await upgrades.deployProxy(
  //   TradingStorage,
  //   [
  //     daiToken.address,
  //     Configs.TempContract, //fake metatradetoken
  //     Configs.LinkErc677,
  //     Configs.Nfts,
  //   ],
  //   {
  //     initializer: "initialize",
  //   }
  // );

  // await tradingStorage.deployed();
  const tradingStorage = await TradingStorage.attach(
    "0xcf74832aed904749E2E0Ccfdd6C782BC74849845"
  );
  console.log("TradingStorage address: ", tradingStorage.address);

  Config.setConfig(network + ".TradingStorage", tradingStorage.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy MTTNftRewards
  const NftReward = await ethers.getContractFactory("MTTNftRewards");
  // const nftRewardsV6 = await NftReward.deploy(tradingStorage.address);
  // await nftRewardsV6.deployed();
  const nftRewardsV6 = await NftReward.attach(
    "0x5D1Ff632B0148F05c859D8A16b8A32F78AA72f72"
  );
  console.log("NftReward address", nftRewardsV6.address);
  Config.setConfig(network + ".NftReward", nftRewardsV6.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy MMTPairInfos
  const PairInfos = await ethers.getContractFactory("MTTPairInfos");
  // const pairInfos = await PairInfos.deploy(tradingStorage.address);
  // await pairInfos.deployed();
  const pairInfos = await PairInfos.attach(
    "0xE313a5a40c46485D558709973CE26b87A4E432c3"
  );
  //await pairInfos.setOnePercentDepthArray([0], [13960121], [21015791]);
  console.log("PairInfos address", pairInfos.address);
  Config.setConfig(network + ".PairInfos", pairInfos.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy referal
  const Referal = await ethers.getContractFactory("MTTReferrals");

  // const refferal = await upgrades.deployProxy(
  //   Referal,
  //   [
  //     tradingStorage.address,
  //     Constructors.Referal.p2,
  //     Constructors.Referal.p3,
  //     Constructors.Referal.p4,
  //     Constructors.Referal.p5,
  //   ],
  //   {
  //     initializer: "initialize",
  //   }
  // );

  // await refferal.deployed();
  const refferal = await Referal.attach(
    "0x2f556e5665daB41E3988D51C970F804d7d1e41F3"
  );
  console.log("Referal address", refferal.address);
  Config.setConfig(network + ".Referal", refferal.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy pair storage
  const PairStorage = await ethers.getContractFactory("MTTPairStorage");

  // const pairStorage = await PairStorage.deploy(
  //   Constructors.PairStorage.p1,
  //   tradingStorage.address
  // );

  // await pairStorage.deployed();
  const pairStorage = await PairStorage.attach(
    "0xAD8863245a3E2911C8cbB1615c29c94C79E4F0e7"
  );
  console.log("PairStorage address", pairStorage.address);
  Config.setConfig(network + ".PairStorage", pairStorage.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy PriceAggregator
  const PriceAggregator = await ethers.getContractFactory("MTTPriceAggregator");

  // const priceAggregator = await PriceAggregator.deploy(
  //   Configs.LinkErc677,
  //   tradingStorage.address,
  //   pairStorage.address,
  //   Configs.LinkPriceFeed,
  //   Constructors.PriceAggregator.p7,
  //   Constructors.PriceAggregator.p8
  // );

  // await priceAggregator.deployed();
  const priceAggregator = await PriceAggregator.attach(
    "0x2b3E9Ab165C6e8ab14642528FB15758B65214C06"
  );
  console.log("PriceAggregator address", priceAggregator.address);
  Config.setConfig(network + ".PriceAggregator", priceAggregator.address);
  await Config.updateConfig();
  //await sleep(10000);
  //deploy trading
  const Trading = await ethers.getContractFactory("MTTTrading");

  // const trading = await Trading.deploy(
  //   tradingStorage.address,
  //   nftRewardsV6.address,
  //   pairInfos.address,
  //   refferal.address,
  //   Configs.MaxPosDai(),
  //   Configs.TimeLock,
  //   Configs.TimeLock
  // );
  // await trading.deployed();
  const trading = await Trading.attach(
    "0xBd96035A54A2bE23Cd1F93e71c60bfd03F1EebEA"
  );
  console.log("Trading address", trading.address);
  Config.setConfig(network + ".Trading", trading.address);
  await Config.updateConfig();
  //await sleep(10000);
  //Deploy MTToken
  const MetaTradeToken = await ethers.getContractFactory("MetaTraderToken"); //new

  // const metaTradeToken = await MetaTradeToken.deploy(
  //   tradingStorage.address,
  //   trading.address,
  //   Configs.TempContract, //tradingCallback.address for set role only, can be set after
  //   Configs.TempContract, //vault.address for set role only, can be set after
  //   Configs.TempContract, //staking.address
  //   nftRewardsV6.address,
  //   childChainManagerProxy.address
  // );
  // await metaTradeToken.deployed();
  const metaTradeToken = await MetaTradeToken.attach(
    "0x1A22253Ebf715dF0c957f6eF0aC9bb44F5EfDf41"
  );
  console.log("MetaTradeToken address", metaTradeToken.address);
  Config.setConfig(network + ".MetaTradeToken", metaTradeToken.address);
  await Config.updateConfig();

  //await sleep(10000);
  //deploy staking
  const Staking = await ethers.getContractFactory("MMTStaking");

  // const staking = await upgrades.deployProxy(
  //   Staking,
  //   [
  //     deployer.address,
  //     metaTradeToken.address,
  //     daiToken.address,
  //     Configs.Nfts,
  //     Configs.VaultBoostsP,
  //     Configs.VaultMaxNftStaked,
  //   ],
  //   {
  //     initializer: "initialize",
  //   }
  // );

  // await staking.deployed();
  const staking = await Staking.attach(
    "0xfdD25837D61a1823141318C427967e3c0644f82F"
  );
  console.log("Staking address", staking.address);
  Config.setConfig(network + ".Staking", staking.address);
  await Config.updateConfig();

  //await sleep(10000);
  //deploy vault new
  const Vault = await ethers.getContractFactory("MMTTradingVault");
  // const vault = await upgrades.deployProxy(Vault, [
  //   Configs.VaultName,
  //   Configs.VaultSymbol,
  //   [
  //     daiToken.address,
  //     deployer.address, //owner
  //     Constructors.Vault.p3_3, //manager
  //     Constructors.Vault.p3_4, //admin
  //     metaTradeToken.address,
  //     nftRewardsV6.address, //fake lockedDepositNft
  //     Configs.TempContract, //tradingCallback.address update after by call updatePnlHandler
  //     Configs.TempContract, //openTradesPnlFeed update after by call updateOpenTradesPnlFeed
  //     [priceAggregator.address, Constructors.Vault.p3_9_2],
  //   ],
  //   Constructors.Vault.p4,
  //   Constructors.Vault.p5,
  //   Constructors.Vault.p6,
  //   Constructors.Vault.p7,
  //   Constructors.Vault.p8,
  //   Constructors.Vault.p9,
  //   Constructors.Vault.p10,
  //   Constructors.Vault.p11,
  //   Constructors.Vault.p12,
  // ]);
  // await vault.deployed();
  const vault = await Vault.attach(
    "0x0878800CcE27f6A76609eCCA2952f44798e2a533"
  );
  console.log("Vault address", vault.address);
  Config.setConfig(network + ".Vault", vault.address);
  await Config.updateConfig();

  //await sleep(10000);
  //deploy mmtCalback
  const TradingCallback = await ethers.getContractFactory(
    "MMTTradingCallbacks"
  );
  // const tradingCallback = await upgrades.deployProxy(TradingCallback, [
  //   tradingStorage.address,
  //   nftRewardsV6.address,
  //   pairInfos.address,
  //   refferal.address,
  //   staking.address,
  //   vault.address,
  //   Constructors.TradingCallback.p7,
  //   Constructors.TradingCallback.p8,
  //   Constructors.TradingCallback.p9,
  // ]);
  // await tradingCallback.deployed();
  const tradingCallback = await TradingCallback.attach(
    "0x64976492686dE923CaD55CAC24Af92Dd34ddda86"
  );
  console.log("TradingCallback address", tradingCallback.address);
  Config.setConfig(network + ".TradingCallback", tradingCallback.address);
  await Config.updateConfig();

  //await sleep(10000);
  //const
  const MMTTokenOpenPnlFeed = await ethers.getContractFactory(
    "MMTTokenOpenPnlFeed"
  );

  // const mmtTokenOpenPnlFeed = await MMTTokenOpenPnlFeed.deploy(
  //   Configs.LinkErc677,
  //   vault.address,
  //   Constructors.MMTTokenOpenPnlFeed.p3,
  //   Settings.PairStorage.Groups[0].g[1],
  //   Constructors.MMTTokenOpenPnlFeed.p5
  // );

  // await mmtTokenOpenPnlFeed.deployed();

  const mmtTokenOpenPnlFeed = await MMTTokenOpenPnlFeed.attach(
    "0x4b43c1C758BF99f50685eB1BA75bd399C24ef43C"
  );
  console.log("MMTTokenOpenPnlFeed address", mmtTokenOpenPnlFeed.address);
  Config.setConfig(
    network + ".MMTTokenOpenPnlFeed",
    mmtTokenOpenPnlFeed.address
  );
  await Config.updateConfig();

  // await sleep(10000);
  // //configs contracts
  // await pairInfos.setManager(deployer.address);
  // console.log("setManager.....");
  // await sleep(10 * 1000);
  // for (const s of Settings.PairInfos.PairParams) {
  //   await pairInfos.setPairParams(s.p1, s.p2);
  // }

  // for (const p of Settings.PairStorage.Groups) {
  //   await pairStorage.addGroup(p.g);
  //   console.log("Sleeping for add addGroup");
  //   await sleep(10 * 1000);
  // }

  // console.log("Finish for addGroup");
  // await sleep(30 * 1000);

  // for (const p of Settings.PairStorage.Fees) {
  //   await pairStorage.addFee(p.f);
  //   console.log("Sleeping for add addFee");
  //   await sleep(3 * 1000);
  // }

  // console.log("addFee finish");
  // await sleep(10 * 1000);

  // for (const p of Settings.PairStorage.Pairs) {
  //   await pairStorage.addPair(p.p);
  //   console.log("Sleeping for add pair");
  //   await sleep(10 * 1000);
  // }

  //trading storage set price agg
  // await tradingStorage.setPriceAggregator(priceAggregator.address);
  // await sleep(11 * 1000);
  // //set trading
  // await tradingStorage.setTrading(trading.address);
  // await sleep(11 * 1000);
  // //set pool
  // //set callback
  // await tradingStorage.setCallbacks(tradingCallback.address);
  // await sleep(11 * 1000);

  // //Reupdate mtt
  // await metaTradeToken.grantRole(Configs.MintRole(), tradingCallback.address);
  // await sleep(11 * 1000);
  // console.log(
  //   "🚀 ~ file: deploy-mumbai.ts:330 ~ main ~ metaTradeToken grantRole tradingCallback:",
  //   metaTradeToken
  // );
  // await sleep(10 * 1000);
  // await metaTradeToken.grantRole(Configs.MintRole(), vault.address);
  // console.log(
  //   "🚀 ~ file: deploy-mumbai.ts:330 ~ main ~ metaTradeToken grantRole vault:",
  //   metaTradeToken
  // );
  // await sleep(10 * 1000);
  // await metaTradeToken.grantRole(Configs.MintRole(), refferal.address);
  // console.log(
  //   "🚀 ~ file: deploy-mumbai.ts:330 ~ main ~ metaTradeToken grantRole refferal:",
  //   metaTradeToken
  // );
  // await sleep(10 * 1000);
  // await metaTradeToken.grantRole(Configs.MintRole(), staking.address);
  // console.log(
  //   "🚀 ~ file: deploy-mumbai.ts:330 ~ main ~ metaTradeToken staking refferal:",
  //   metaTradeToken
  // );
  // await sleep(10 * 1000);

  // //remove temp role
  // await metaTradeToken.revokeRole(Configs.MintRole(), Configs.TempContract);

  // //trading pause
  // await trading.pause();
  // await sleep(20 * 1000);
  // //callback pause
  // await tradingCallback.pause();
  // await sleep(20 * 1000);
  // try {
  //   //update token
  //   await tradingStorage.updateToken(metaTradeToken.address);
  // } catch (error) {
  //   console.log("updateToken error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //addTradingContract
  //   await tradingStorage.addTradingContract(trading.address);
  // } catch (error) {
  //   console.log("addTradingContract trading error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //addTradingContract tradingCallback
  //   await tradingStorage.addTradingContract(tradingCallback.address);
  // } catch (error) {
  //   console.log("addTradingContract tradingCallback error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //addTradingContract nftRewards
  //   await tradingStorage.addTradingContract(nftRewardsV6.address);
  // } catch (error) {
  //   console.log("addTradingContract nftRewardsV6 error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //addTradingContract refferal
  //   await tradingStorage.addTradingContract(refferal.address);
  // } catch (error) {
  //   console.log("addTradingContract refferal error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //add vault
  //   await tradingStorage.addTradingContract(vault.address);
  // } catch (error) {
  //   console.log("addTradingContract vault error", error);
  // }
  // await sleep(11 * 1000);
  // try {
  //   //add staking
  //   await tradingStorage.addTradingContract(staking.address);
  // } catch (error) {
  //   console.log("addTradingContract staking error", error);
  // }

  // //trading unpause
  // await sleep(20 * 1000);
  // await trading.pause();
  // await sleep(20 * 1000);
  // //callback unpause
  // await tradingCallback.pause();

  // //set istestnet
  // //trading storage setMaxOpenInterestDai
  // for (let i = 0; i < Settings.PairStorage.Pairs.length; i++) {
  //   if (i === 0 || i === 1) {
  //     await tradingStorage.setMaxOpenInterestDai(
  //       i,
  //       parseEther("52000").toString()
  //     );
  //   } else if (i === 2 || i === 3 || i === 4) {
  //     await tradingStorage.setMaxOpenInterestDai(
  //       i,
  //       parseEther("5200").toString()
  //     );
  //   } else if (i === 5) {
  //     await tradingStorage.setMaxOpenInterestDai(
  //       i,
  //       parseEther("10400").toString()
  //     );
  //   } else if (i === 6) {
  //     await tradingStorage.setMaxOpenInterestDai(
  //       i,
  //       parseEther("31100").toString()
  //     );
  //   }
  //   await sleep(10 * 1000);
  // }

  // //trading storage setVault
  // await tradingStorage.setVault(vault.address);
  // await sleep(11 * 1000);
  // //Reupdate for proxy
  // await vault.updatePnlHandler(tradingCallback.address);
  // await sleep(11 * 1000);
  // await vault.updateOpenTradesPnlFeed(mmtTokenOpenPnlFeed.address);

  //child mng
  console.log("start verify childChainManager");
  try {
    await run("verify:verify", {
      address: childChainManager.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify childChainManager", error);
  }
  console.log("finish verify childChainManager");

  //proxy
  console.log("start verify childChainManagerProxy");
  try {
    await run("verify:verify", {
      address: childChainManagerProxy.address,
      constructorArguments: [childChainManager.address],
    });
  } catch (error) {
    console.log("Error verify childChainManagerProxy", error);
  }
  console.log("finish verify childChainManagerProxy");

  //TradingStorage
  console.log("start verify tradingStorage");
  try {
    await run("verify:verify", {
      address: tradingStorage.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify tradingStorage", error);
  }
  console.log("finish verify tradingStorage");

  //MTTNftRewards
  console.log("start verify MTTNftRewards");
  try {
    await run("verify:verify", {
      address: nftRewardsV6.address,
      constructorArguments: [tradingStorage.address],
    });
  } catch (error) {
    console.log("Error verify MTTNftRewards", error);
  }
  console.log("finish verify MTTNftRewards");

  //MMTPairInfos
  console.log("start verify MMTPairInfos");
  try {
    await run("verify:verify", {
      address: pairInfos.address,
      constructorArguments: [tradingStorage.address],
    });
  } catch (error) {
    console.log("Error verify MMTPairInfos", error);
  }
  console.log("finish verify MMTPairInfos");

  //referal
  console.log("start verify Referal");
  try {
    await run("verify:verify", {
      address: refferal.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify Referal", error);
  }
  console.log("finish verify Referal");

  //PairStorage
  console.log("start verify PairStorage");
  try {
    await run("verify:verify", {
      address: pairStorage.address,
      constructorArguments: [
        Constructors.PairStorage.p1,
        tradingStorage.address,
      ],
    });
  } catch (error) {
    console.log("Error verify PairStorage", error);
  }
  console.log("finish verify PairStorage");

  //PriceAggregator
  console.log("start verify PriceAggregator");
  try {
    await run("verify:verify", {
      address: priceAggregator.address,
      constructorArguments: [
        Configs.LinkErc677,
        tradingStorage.address,
        pairStorage.address,
        Configs.LinkPriceFeed,
        Constructors.PriceAggregator.p7,
        Constructors.PriceAggregator.p8,
      ],
    });
  } catch (error) {
    console.log("Error verify PriceAggregator", error);
  }
  console.log("finish verify PriceAggregator");

  //trading
  console.log("start verify Trading");
  try {
    await run("verify:verify", {
      address: trading.address,
      constructorArguments: [
        tradingStorage.address,
        nftRewardsV6.address,
        pairInfos.address,
        refferal.address,
        Configs.MaxPosDai(),
        Configs.TimeLock,
        Configs.TimeLock,
      ],
    });
  } catch (error) {
    console.log("Error verify trading", error);
  }
  console.log("finish verify Trading");

  //vault
  console.log("start verify Vault");
  try {
    await run("verify:verify", {
      address: vault.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify Vault", error);
  }
  console.log("finish verify Vault");

  //tradingCallback
  console.log("start verify tradingCallback");
  try {
    await run("verify:verify", {
      address: tradingCallback.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify tradingCallback", error);
  }
  console.log("finish verify tradingCallback");

  //MTToken
  console.log("start verify MTToken");
  try {
    await run("verify:verify", {
      address: metaTradeToken.address,
      constructorArguments: [
        tradingStorage.address,
        trading.address,
        Configs.TempContract,
        Configs.TempContract,
        Configs.TempContract,
        nftRewardsV6.address,
        childChainManagerProxy.address,
      ],
    });
  } catch (error) {
    console.log("Error verify MTToken");
  }
  console.log("finish verify MTToken");

  console.log("start verify staking");
  try {
    await run("verify:verify", {
      address: staking.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Error verify staking", error);
  }
  console.log("finish verify staking");

  console.log("start verify mmtTokenOpenPnlFeed");
  try {
    await run("verify:verify", {
      address: mmtTokenOpenPnlFeed.address,
      constructorArguments: [
        Configs.LinkErc677,
        vault.address,
        Constructors.MMTTokenOpenPnlFeed.p3,
        Settings.PairStorage.Groups[0].g[1],
        Constructors.MMTTokenOpenPnlFeed.p5
      ],
    });
  } catch (error) {
    console.log("Error verify mmtTokenOpenPnlFeed", error);
  }
  console.log("finish verify mmtTokenOpenPnlFeed");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
