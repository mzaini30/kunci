#!/usr/bin/env node

import { encrypt } from "crypto-zen";
import { readFileSync, writeFileSync, existsSync, readFile } from "fs";
import { argv } from "process";
const { parse, stringify } = JSON;

if (!existsSync(".gitignore")) {
  writeFileSync(".gitignore", "");
}

let isiGitignore = readFileSync(".gitignore").toString();
let gitignore = isiGitignore.split("\n");

function masukkanKeGitignore(file) {
  if (!gitignore.includes(file)) {
    gitignore.push(file);
  }
}

masukkanKeGitignore("kunci.txt");

if (argv.length > 2) {
  let listFile: string[] = [];
  if (existsSync("kunci.json")) {
    listFile = parse(readFileSync("kunci.json").toString());
  }
  if (!existsSync("kunci.txt")) {
    console.log("Nggak ada file kunci.txt. Siapkan dulu ya...");
  } else {
    let filenya = argv.slice(2);
    for (let x of filenya) {
      masukkanKeGitignore(x);
      if (!listFile.includes(x)) {
        listFile.push(x);
      }
    }
    writeFileSync("kunci.json", stringify(listFile, null, 2));
  }
} else {
  let lihatYangMauDikunci: string | string[] =
    readFileSync("kunci.json").toString();
  lihatYangMauDikunci = parse(lihatYangMauDikunci);
  for (let x of lihatYangMauDikunci) {
    if (existsSync(x)) {
      let kuncinya = readFileSync("kunci.txt").toString().trim();
      let isinya = readFileSync(x).toString("base64");
      let terkunci = encrypt(isinya, kuncinya);
      writeFileSync(`${x}.rahasia`, terkunci, "base64");
    }
  }
}

writeFileSync(".gitignore", gitignore.join("\n"));
