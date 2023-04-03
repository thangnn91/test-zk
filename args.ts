import constants from './constants';
import { Configs, Constructors, Settings } from './test/configs-zk-test';
module.exports = [
    Configs.LinkErc677,
    "0x0878800CcE27f6A76609eCCA2952f44798e2a533",
    Constructors.MMTTokenOpenPnlFeed.p3,
    Settings.PairStorage.Groups[0].g[1],
    Constructors.MMTTokenOpenPnlFeed.p5
];
