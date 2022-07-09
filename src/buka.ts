#!/usr/bin/env node

import { decrypt } from "crypto-zen";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { $ } from "zx";

const { parse } = JSON;

let kunci = readFileSync("kunci.txt").toString().trim();
let listFile: string | string[] = readFileSync("kunci.json").toString();
listFile = parse(listFile);

async function init(): Promise<void> {
  for (let x of listFile) {
    if (existsSync(`${x}.rahasia`)) {
      let isinya = readFileSync(`${x}.rahasia`).toString("base64");
      isinya = decrypt(isinya, kunci);
      writeFileSync(x, isinya, "base64");
      await $`rm ${x}.rahasia`;
    }
  }
}
init();
