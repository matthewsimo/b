import type { Config, List } from "./types";
import { configPath } from "./utils";

export const getConfig = async (): Promise<Config> => {
  const configFile = Bun.file(configPath, { type: "application/json" });
  const exists = await configFile.exists();

  if (exists) {
    const data = await configFile.text();
    return JSON.parse(data);
  } else {
    console.error("Error: config doesn't exist");
    return {};
  }
};

export const saveConfig = async (data: Config) => {
  const configFile = Bun.file(configPath, { type: "application/json" });
  const exists = await configFile.exists();

  if (exists) {
    Bun.write(configPath, JSON.stringify(data, undefined, 2));
  }
};

export const getList = async (list: string): Promise<List | undefined> => {
  const config = await getConfig();

  if (config[list]) {
    return config[list];
  } else {
    console.error(`Error: List '${list}' does not exist`);
  }
};
