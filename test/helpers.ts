import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
export function parseDai(ether: string): BigNumber {
  return parseUnits(ether, 6);
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export interface INetwork {
  arbtest: string;
  arbmain: string;
}

export const Deployed = {
  arbmain: {
    pairStorage: "0xF8c849781058264601250D778Ac877f9A12e8619",
    pairInfo: "0xA4D6ca3bbae49849d452072E28E23113D0B08f26",
    tradingStorage: "0x1B6028AbbF9f0C719B016F9036643F7D963722Bd",
    staking: "0xBdB00022030C9D715A10F2fCeDb19e99020Aa357",
  },
  arbtest: {
    pairStorage: "0xeFd9BF572160688699A4214cEF2a2111EF5C1a98",
    pairInfo: "0xb9D844362b814effF55FA29C07F3c34819a40659",
    tradingStorage: "0x456cEb89deb9bF74F00418c89fDB1BffE716987D",
    staking: "0x5A7F4A3Cb14b77D1E0B4973fa8EBE190bF81F250",
  },
};