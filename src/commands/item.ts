import { getConfig, saveConfig } from "../storage";
import { copy } from "../utils";

export const getListItem = async (
  list: string,
  item: string,
): Promise<string | undefined> => {
  const config = await getConfig();

  if (config[list] && config[list][item]) {
    return config[list][item];
  } else {
    console.error(`Error: Item '${list}:${item}' does not exist`);
  }
};

export const getItem = async (item: string): Promise<string[] | undefined> => {
  const config = await getConfig();

  let matches: string[] = [];

  Object.keys(config).forEach((v) => {
    if (config[v][item]) {
      matches.push(v);
    }
  });

  if (matches.length > 0) {
    return matches.map((match) => config[match][item]);
  } else {
    console.error(`Error: Item '${item}' not found in any list`);
  }
};

//export const getItem = async (item: string, list?: string) => {
//  const data = await getConfig();
//
//  console.log({ item, list });
//
//  console.log(`get item '${item}'`);
//};

export const createItem = async (list: string, item: string, value: string) => {
  const data = await getConfig();

  if (!data[list]) {
    data[list] = {};
  }

  data[list][item] = value;
  console.log(
    `Remembering item '${item}' with value '${value}' in the '${list}' list`,
  );

  await saveConfig(data);
};

export const handleItem = async (
  list: string,
  item: string,
  e: boolean = false,
) => {
  const value = await getListItem(list, item);

  if (value) {
    if (e) {
      console.log(value);
    } else {
      console.log(`'${value}' copied`);
      await copy(value);
    }
  } else {
    console.log(`No '${item}' item found in the '${list}' list`);
  }
};
