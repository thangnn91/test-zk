import { parseEther } from "@ethersproject/units";
import { utils } from "ethers";
import { parseDai } from "./helpers";

export const Configs = {
  LinkErc677: "0x402543F0e695913838b57620d4A872497085Fce0",
  TokenDaiLp: "0xD15E3D11c4391993AF6E22686347E8A10Aa6046C", //only mumbai testnet
  LinkPriceFeed: "0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408", //https://docs.chain.link/data-feeds/price-feeds/addresses?network=polygon LINK/USD
  Nfts: [
    "0x26CB434c8DF11aCa11B48Cdb3c2A1Ea96FF505A0", //matic nfts
    "0x01d8Eb6f856D20e3342CE9c72E4E2a5CDd3728cc", //matic nfts
    "0x9b1F7752cdBB516E0Eb28Fea938d1804898a9a86", //matic nfts
    "0xCB15219D3291E5410Bba978b3daD64b7FD79543c", //matic nfts
    "0xa782015A8146a690Fe67c288b215c947f92454AE", //matic nfts
  ],
  MaxPosDai: () => {
    return parseDai("100000").toString();
  },
  TimeLock: 30,
  NullAddress: "0x0000000000000000000000000000000000000000",
  VaultName: "mUSDC",
  VaultSymbol: "mUSDC",
  VaultBoostsP: [2, 3, 5, 8, 13],
  VaultMaxNftStaked: 3,
  Holder: "0x1828C0C077454dA4A461fe45C78d94b21f529297",
  TempContract: "0x0000000000000000000000000000000000000001",
  MaxUint256:
    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  MintRole: () => {
    return utils.keccak256(utils.toUtf8Bytes("MINTER_ROLE"));
  },
  DepositRole: () => {
    return utils.keccak256(utils.toUtf8Bytes("DEPOSITOR_ROLE"));
  },
  BurnRole: () => {
    return utils.keccak256(utils.toUtf8Bytes("BURNER_ROLE"));
  },
  BrideRole: () => {
    return utils.keccak256(utils.toUtf8Bytes("BRIDGE_ROLE"));
  },
};

export const Constructors = {
  Referal: {
    p2: 10,
    p3: 75,
    p4: 33,
    p5: 10000000,
  },
  PairStorage: { p1: 10000 },
  PriceAggregator: {
    p3: 3600,
    p7: 1,
    p8: [], //nodes
  },
  TradingCallback: {
    p7: 50,
    p8: 0,
    p9: 50,
  },
  Vault: {
    p3_3: "0x32F9df36E0Af2542dF5f76560fAcFA961Bd3C6a1", //manager
    p3_4: "0x9d63985B9482a36C34B626137BfB45fb6ed7aD1b", //admin
    p3_9_2: "0x3c88e882",
    p4: 60, //_MIN_LOCK_DURATION
    p5: "200000000000000000", //_maxAccOpenPnlDelta
    p6: "500000000000000000", //_maxDailyAccPnlDelta
    p7: ["10000000000000000000", "20000000000000000000"], //uint256[2] memory _withdrawLockThresholdsP,
    p8: "2000000000000000000", //_maxSupplyIncreaseDailyP
    p9: "1000000000000000000", //_lossesBurnP
    p10: "50000000000000000", //_maxMmtSupplyMintDailyP
    p11: "5000000000000000000", //_maxDiscountP
    p12: "130000000000000000000", //_maxDiscountThresholdP
  },
  MMTTokenOpenPnlFeed: {
    p3: [
      "0x59cA4A37cb615DB61C2A296D400c5e98E6A825F5",
      "0x09C05aD6ec38d0a72BEde36e0423f239f9bD67cD",
      "0x118dfeFc065237FED5FBDAf78bA9582207b7bB89",
      "0x28047C612132b84c0108E9EAb0113DA47aEB6ad2",
      "0x28047C612132b84c0108E9EAb0113DA47aEB6ad2",
      "0x28047C612132b84c0108E9EAb0113DA47aEB6ad2",
      "0x28047C612132b84c0108E9EAb0113DA47aEB6ad2",
    ], //nodes chainlink
    p5: 1,
  },
};

export const Settings = {
  PairInfos: {
    PairParams: [
      {
        p1: 0,
        p2: [0, 0, 211444, 24404],
      },
      {
        p1: 1,
        p2: [0, 0, 251134, 35118],
      },
      {
        p1: 2,
        p2: [1450340, 1519566, 438439, 46801],
      },
      {
        p1: 3,
        p2: [2299266, 2513084, 283679, 65082],
      },
      {
        p1: 4,
        p2: [0, 0, 283679, 65082],
      },
      {
        p1: 5,
        p2: [1746900, 2360628, 297704, 50398],
      },
      {
        p1: 6,
        p2: [0, 0, 63103, 0],
      },
    ],
  },
  PairStorage: {
    Groups: [
      {
        g: [
          "crypto",
          "0xa8ab0f58c63544be9600b8b79f12632700000000000000000000000000000000",
          2,
          150,
          75,
        ],
      },
      {
        g: [
          "forex",
          "0xe0a605acdd284fbea0eace0ba5f57e9000000000000000000000000000000000",
          10,
          1000,
          25,
        ],
      },
    ],
    Fees: [
      {
        f: [
          "crypto",
          300000000,
          600000000,
          4000000,
          200000000,
          1,
          "15000000000",
        ],
      },
      {
        f: ["forex", 30000000, 60000000, 4000000, 20000000, 1, "15000000000"],
      },
    ],
    Pairs: [
      {
        p: [
          "BTC",
          "USD",
          [
            "0x6550bc2301936011c1334555e62A87705A81C12C",
            "0x6550bc2301936011c1334555e62A87705A81C12C",
            0,
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
      {
        p: [
          "ETH",
          "USD",
          [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            0,
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
      {
        p: [
          "ATOM",
          "USD",
          [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            3, //fake undefined, only testnet
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
      {
        p: [
          "BNB",
          "USD",
          [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            3, //fake undefined, only testnet
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
      {
        p: [
          "GMX",
          "USD",
          [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            3, //fake undefined, only testnet
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
      {
        p: [
          "MATIC",
          "USD",
          [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            3, //fake undefined, only testnet
            "100000000000000000000000",
          ],
          500000000,
          0,
          0,
        ],
      },
    ],
  },
};
