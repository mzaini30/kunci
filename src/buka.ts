#!/usr/bin/env node

import { decrypt } from "crypto-zen";
import { writeFileSync, readFileSync, existsSync } from "fs";

const { parse } = JSON;

let kunci = readFileSync("kunci.txt").toString().trim();
let listFile: string | string[] = readFileSync("kunci.json").toString();
listFile = parse(listFile);

for (let x of listFile) {
  if (existsSync(`${x}.rahasia`)) {
    let isinya = readFileSync(`${x}.rahasia`).toString("base64");
    isinya = decrypt(isinya, kunci);
    writeFileSync(x, isinya, "base64");
  }
}
