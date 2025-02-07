import { type Arguments, type Argv, type CommandModule } from "yargs";
import { getConfig, saveConfig } from "../storage";
import type { Config } from "../types";
import { getMatches } from "../utils";

type Args = {
  list: string;
  item?: string;
  l?: boolean;
};

const Command: CommandModule<{}, Args> = {
  // b rm <list> - forget a list
  // b rm <list> <item> - forget item from list
  command: "remove <list> [item]",
  aliases: ["rm", "delete", "d"],
  describe: "Removes a list or item",
  builder: (yargs: Argv<{}>) => {
    return yargs
      .positional("item", {
        describe: "The item to remove",
        type: "string",
      })
      .positional("list", {
        describe: "The list to remove or look in to find the item for removal",
        type: "string",
        demandOption: true,
      })
      .option("l", {
        describe: "Use this flag to remove a list if it also matches an item",
        type: "boolean",
      });
  },
  handler: async (argv: Arguments<Args>) => {
    const { list, item, l } = argv;

    let data = await getConfig();

    if (!item) {
      const matches = await getMatches(list, l);

      if (matches.length === 0) {
        console.log(`No matching items or lists found for '${list}'`);
      } else if (matches.length > 1) {
        matches.map((match) => {
          const msg = match.item
            ? `Found item '${match.item}' in the '${match.list}' list`
            : `Found the '${match.list}' list'`;
          console.log(msg);
        });
        console.log(
          `\nPlease rerun and specify both the list & item${matches.filter((v) => !v.item).length > 0 ? " or use the -l flag" : ""}`,
        );
      } else {
        const m = matches[0];
        if (m.item) {
          data = deleteItem(data, m.list, m.item);
        } else {
          data = deleteList(data, m.list);
        }
      }
    } else {
      data = deleteItem(data, list, item);
    }

    await saveConfig(data);
  },
};

const deleteItem = (data: Config, list: string, item: string): Config => {
  if (data[list][item]) {
    console.log(`Forgetting about the item '${item}' in the '${list}' list`);
    delete data[list][item];
  } else {
    console.log(`The item '${item}' in the '${list}' list doesn't exist!`);
  }
  return data;
};

const deleteList = (data: Config, list: string): Config => {
  if (data[list]) {
    console.log(`Forgetting about the '${list}' list`);
    delete data[list];
  } else {
    console.log(`The '${list}' list doesn't exist!`);
  }
  return data;
};

export default Command;
