import { spawn } from "bun";
import path from "node:path";
import os from "node:os";
import { getConfig } from "./storage";

export const configPath = path.join(os.homedir(), `.config/b/config.json`);

export const initConfig = async () => {
  const configFile = Bun.file(configPath, { type: "application/json" });
  const exists = await configFile.exists();

  if (!exists) {
    Bun.write(configPath, JSON.stringify({}, undefined, 2));
  }
};

export const copy = async (data: string) => {
  const proc = spawn(["pbcopy"], {
    stdin: "pipe",
  });
  proc.stdin.write(data);
  proc.stdin.flush();
  proc.stdin.end();

  await proc.exited;
};

export const getLists = async () => {
  const data = await getConfig();

  const lists: string[] = [];
  for (let list in data) {
    lists.push(list);
  }

  return lists;
};

export const getMatches = async (list: string, l: boolean = false) => {
  const data = await getConfig();
  const matches: { list: string; item?: string }[] = [];

  if (data[list]) {
    matches.push({ list });
  }

  if (!l) {
    let maybeItem = list;

    Object.keys(data).forEach((v) => {
      if (data[v][maybeItem]) {
        matches.push({ list: v, item: maybeItem });
      }
    });
  }
  return matches;
};
