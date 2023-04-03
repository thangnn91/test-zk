import { promises as fs } from "fs";

var config: any;

export async function initConfig() {
  console.log("init");
  config = JSON.parse((await fs.readFile("./config.json")).toString());
  return config;
}

export function getConfig() {
  return config;
}

//path: network.SCNAME
export function setConfig(path: string, val: string) {
  console.log(config);
  try {
    let [network, name] = path.split(".");
    var ref = config;
    if (!ref[network]) ref[network] = {};
    ref[network][name] = val;
  } catch (err) {
    console.log(err);
  }
}

export async function updateConfig() {
  console.log("write: ", JSON.stringify(config));

  return fs.writeFile("./config.json", JSON.stringify(config, null, 2));
}
