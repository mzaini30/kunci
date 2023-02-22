#!/usr/bin/env node

import { encrypt } from "crypto-zen";
import {
  readFileSync,
  writeFileSync,
  existsSync,
} from "fs";
import { argv } from "process";
import { $ } from "zx";

const { parse, stringify } = JSON;

if (!existsSync(".gitignore")) {
  writeFileSync(".gitignore", "");
}


async function hooks() {
    if (
      !existsSync(".git/hooks/pre-commit") &&
      existsSync(".git/hooks/pre-commit.sample")
    ) {
      await $`cp .git/hooks/pre-commit.sample .git/hooks/pre-commit`;
      writeFileSync(".git/hooks/pre-commit", `#!/bin/bash
pnpm kunci`);
    }
}
hooks();

let isiGitignore = readFileSync(".gitignore").toString();
let gitignore = isiGitignore.split("\n");

function masukkanKeGitignore(file) {
  // if (!gitignore.includes(file)) {
    gitignore.push(file);
    gitignore = [...new Set(gitignore)]
  // }
}

masukkanKeGitignore("kunci.txt");

async function init() {
  if (argv.length > 2) {
    // kunci nama-file.js
    let listFile = [];
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
    // kunci
    let lihatYangMauDikunci = readFileSync("kunci.json").toString();
    lihatYangMauDikunci = parse(lihatYangMauDikunci);
    for (let x of lihatYangMauDikunci) {
      if (existsSync(x)) {
        let kuncinya = readFileSync("kunci.txt").toString().trim();
        let isinya = readFileSync(x).toString("base64");
        let terkunci = encrypt(isinya, kuncinya);
        writeFileSync(`${x}.rahasia`, terkunci, "base64");
        await $`rm ${x}`;
      }
    }
  }
}
init();

writeFileSync(".gitignore", gitignore.join("\n"));
