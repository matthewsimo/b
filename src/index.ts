#! /usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { initConfig } from "./utils";

import main from "./commands/main";
import dump from "./commands/dump";
import remove from "./commands/remove";

await initConfig();

yargs(hideBin(process.argv))
  .scriptName("b")
  .command(main)
  .command(dump)
  .command(remove)
  .help()
  .parse();
